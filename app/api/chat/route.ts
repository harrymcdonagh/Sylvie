import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_ENDPOINT =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"; // Free model

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!HF_API_KEY) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
  }

  try {
    // Improved prompt structure to get a proper response
    const formattedPrompt = `You are a helpful AI assistant. Answer the following question concisely and directly:\n\nUser: ${message}\n\nAI:`;

    const response = await axios.post(
      MODEL_ENDPOINT,
      { inputs: formattedPrompt },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    console.log(response.data[0]?.generated_text);
    return NextResponse.json({
      reply: response.data[0]?.generated_text || "No response from model",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Hugging Face API Error:", error.response?.data || error.message);
      return NextResponse.json(
        { error: "Failed to get response from Hugging Face API" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("Unexpected Error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
