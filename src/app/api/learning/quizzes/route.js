import connectDB from "@/lib/connectDB";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserProgress from "@/models/learning/UserProgress";
import QuizAttempt from "@/models/learning/QuizAttempt";
import UserProfile from "@/models/UserProfile";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const course = searchParams.get("course");

    const res = await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjA5vU__O3rkHq2DtL7Oi6G6FMxhRDdqp5O9jdAycYNyQDjoQAJ1TeKCKNDYzh2Co3riDjwAdU6qJ0Qo8XLZFxGVwE2dzhiJyJma_0e3AMT5TyoCR6bV7A1Xyd1mrqs5uz8f5YVKmI6TrkkZ3h-Q21_J3nT-cBLEQBhtiNcOb3EpTwcJSIQhPESNf-zjdgwUoUZXH912ayYlabpFjc9KQOR3RZq2qTCWHqiKxAzYGIqay-mvprJcigrICRlACngbsASy-AdPaj_CH001HlmGCCfzf2F5aVDYvhZ4fIU&lib=MS8Mi9uNB1P9TJbAq7b7LhhMqR4pDWbV5"
    );

    let data = res.data;

    if (course) {
      data = data.filter(
        (q) => q.Course?.toLowerCase() === course.toLowerCase()
      );
    }

    return NextResponse.json({ success: true, counts: data.length, data });
  } catch (error) {
    console.error("Quiz API Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId, answers } = await req.json();
    const userId = session.user._id;

    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress || progress.progressPercentage !== 100) {
      return NextResponse.json(
        { message: "Complete course first" },
        { status: 403 }
      );
    }

    const sheetRes = await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjA5vU__O3rkHq2DtL7Oi6G6FMxhRDdqp5O9jdAycYNyQDjoQAJ1TeKCKNDYzh2Co3riDjwAdU6qJ0Qo8XLZFxGVwE2dzhiJyJma_0e3AMT5TyoCR6bV7A1Xyd1mrqs5uz8f5YVKmI6TrkkZ3h-Q21_J3nT-cBLEQBhtiNcOb3EpTwcJSIQhPESNf-zjdgwUoUZXH912ayYlabpFjc9KQOR3RZq2qTCWHqiKxAzYGIqay-mvprJcigrICRlACngbsASy-AdPaj_CH001HlmGCCfzf2F5aVDYvhZ4fIU&lib=MS8Mi9uNB1P9TJbAq7b7LhhMqR4pDWbV5"
    );

    const quizData = sheetRes.data;

    let correct = 0;

    const evaluatedAnswers = answers.map((ans) => {
      const q = quizData.find((item) => item._row === ans.sheetRow);

      const isCorrect = ans.selectedOption === q.Correct;

      if (!q) {
        return {
          sheetRow: ans.sheetRow,
          selectedOption: ans.selectedOption,
          isCorrect: false,
          error: "Question not found",
        };
      }

      if (isCorrect) correct++;

      return {
        sheetRow: ans.sheetRow,
        selectedOption: ans.selectedOption,
        correctOption: q.Correct,
        isCorrect,
      };
    });

    const totalQuestions = answers.length;
    const percentage = Math.round((correct / totalQuestions) * 100);
    const isPassed = percentage >= 70;

    await QuizAttempt.create({
      userId,
      courseId,
      answers: evaluatedAnswers,
      totalQuestions,
      correctAnswers: correct,
      percentage,
      isPassed,
    });

    if (isPassed) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
      await progress.save();

      const profile = await UserProfile.findOne({ userId });

      if (profile) {
        profile.recentActivity.push({
          action: "Completed a course",
          icon: "CheckCircle",
          color: "text-green-500",
          courseId,
          timestamp: new Date(),
        });

        await profile.save();
      }
    }

    return NextResponse.json({
      success: true,
      percentage,
      isPassed,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Quiz submission failed" },
      { status: 500 }
    );
  }
}
