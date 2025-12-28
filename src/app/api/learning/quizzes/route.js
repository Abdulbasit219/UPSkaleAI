import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const course = searchParams.get("course");

    const res = await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLh60DrH_W1WhlfzRsNNHn-n4x02TVQ8_9uY2ksxVFq9UhpNVucA2nD23sXsCswZZKds44Y8ZjszMuoSFXqCXOCUUu9o3-X1FzpigxyMngQ3iCTxkBCSiVhHwnuXeSB6ctNpNFsLzwGOMIkc0DWwXPPqro_MYBxzMyLK7c4jWwwX2eTOsO9jLzlKmsNf1-ej6LHgPsYP-MEPephlrC6KfOVCXTBWlNeXbMgwhU0-MefZ_qJWiteGVOG46bGsIzzAe58LU6ooeP7QV5eIeO6N9wkZkPqwhChbB_2CoGyo&lib=MS8Mi9uNB1P9TJbAq7b7LhhMqR4pDWbV5"
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
