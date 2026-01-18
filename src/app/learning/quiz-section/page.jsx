"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const QuizSection = ({ courseTitle }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!courseTitle) return;

    axios
      .get(`/api/learning/quizzes?course=${courseTitle}`)
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => console.error("Quiz fetch error:", err));
  }, [courseTitle]);

  const handleSelect = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  return (
    <div className="mt-10 bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Quiz</h3>

      {quizzes.length === 0 && (
        <p className="text-gray-400 text-sm">No quizzes found.</p>
      )}

      {quizzes.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="text-white font-medium mb-2">
            {i + 1}. {q.Question}
          </p>

          {["A", "B", "C", "D"].map((opt) => (
            <label key={opt} className="block text-gray-300 cursor-pointer">
              <input
                type="radio"
                name={`q-${i}`}
                className="mr-2"
                onChange={() => handleSelect(i, opt)}
              />
              {q[`Option ${opt}`]}
            </label>
          ))}

          {answers[i] && (
            <p
              className={`mt-2 text-sm ${
                answers[i] === q.Correct
                  ? "text-green-400"
                  : "text-red-400"
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
  );
};

export default QuizSection;
