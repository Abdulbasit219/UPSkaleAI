"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const QuizPage = () => {
  const { courseId, courseTitle } = useParams(); // title ke base
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`/api/learning/quizzes?course=${courseTitle}`)
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => console.error(err));
  }, [courseTitle]);

  const handleSelect = (i, option) => {
    setAnswers({ ...answers, [i]: option });
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-4xl mx-auto bg-slate-800/50 border border-purple-500/20 rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Quiz</h1>
          <Link href={`/learning/${courseId}`} className="text-purple-400">
            ← Back to Course
          </Link>
        </div>

        {quizzes.map((q, i) => (
          <div key={i} className="mb-6">
            <p className="text-white font-medium mb-2">{q.Question}</p>

            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt} className="block text-gray-300">
                <input
                  type="radio"
                  name={q.Question}
                  className="mr-2"
                  onChange={() => handleSelect(i, opt)}
                />
                {q[`Option ${opt}`]}
              </label>
            ))}

            {answers[i] && (
              <p
                className={`mt-2 text-sm ${
                  answers[i] === q.Correct ? "text-green-400" : "text-red-400"
                }`}
              >
                {answers[i] === q.Correct
                  ? "Correct!"
                  : `Wrong. ${q.Explanation}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
