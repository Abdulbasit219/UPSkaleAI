import os


client = MongoClient(os.getenv('MONGODB_URL', 'mongodb://mongo:27017'))
db = client.skillbridge


MODEL_OUT = os.getenv('RECOMMENDER_MODEL_PATH', '/data/models/recommender.pkl')




def build_dataset(limit=100000):
events = list(db.events.find({}))
rows = []
for e in events:
label = 1 if e.get('label') in ('clicked','applied','helpful','correct') else 0
user_skills = (e.get('context') or {}).get('user_skills', []) or []
if e.get('job_id'):
job = db.jobs.find_one({'job_id': e['job_id']})
else:
job = None
if not job:
continue
job_skills = job.get('skills') or []
us = set([s.lower() for s in user_skills])
js = set([s.lower() for s in job_skills])
union = us | js
jaccard = len(us & js) / max(1, len(union))
shared = len(us & js)
rows.append({'label': label, 'jaccard': jaccard, 'shared': shared})
if len(rows) >= limit:
break
df = pd.DataFrame(rows)
return df




def train_and_save():
df = build_dataset()
if df.empty:
print('No data to train on')
return
X = df[['jaccard','shared']].values
y = df['label'].values
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)
train_data = lgb.Dataset(X_train, label=y_train)
params = { 'objective':'binary', 'metric':'auc', 'verbosity': -1 }
bst = lgb.train(params, train_data, num_boost_round=100)
y_pred = bst.predict(X_test)
auc = roc_auc_score(y_test, y_pred)
print('AUC:', auc)
out_dir = os.path.dirname(MODEL_OUT)
if out_dir and not os.path.exists(out_dir):
os.makedirs(out_dir, exist_ok=True)
with open(MODEL_OUT, 'wb') as f:
pickle.dump(bst, f)
print(f'Saved model to {MODEL_OUT}')


if __name__ == '__main__':
train_and_save()