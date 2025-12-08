import redis
import os
import json


r = redis.Redis(host=os.getenv('REDIS_HOST', 'localhost'), port=int(os.getenv('REDIS_PORT', 6379)))
STREAM_KEY = 'skillbridge_events'




def publish_event(evt: dict):
r.xadd(STREAM_KEY, {'payload': json.dumps(evt)})




def read_events(count=10, block=1000):
resp = r.xread({STREAM_KEY: '$'}, block=block, count=count)
# resp is list of (stream, [(id, {b'payload': b'...'}), ...])
out = []
if not resp:
return out
for stream, messages in resp:
for msg_id, fields in messages:
payload = json.loads(fields[b'payload'].decode())
out.append((msg_id.decode(), payload))
return out