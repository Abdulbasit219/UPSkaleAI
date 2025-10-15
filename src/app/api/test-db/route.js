import connectDB  from "@/app/lib/connectDB";

export async function GET() {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ message: "MongoDB Connected Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Connection Failed", details: error.message }),
      { status: 500 }
    );
  }
}
