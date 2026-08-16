import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const {
      jobPosition,
      jobDescription,
      duration,
      type,
    } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replaceAll("{{jobTitle}}", jobPosition)
      .replaceAll("{{jobDescription}}", jobDescription)
      .replaceAll("{{duration}}", duration)
      .replaceAll("{{type}}", type.join(", "));

    console.log("FINAL PROMPT:", FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });

    console.log(completion.choices[0].message);

    return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.error("AI API ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "AI request failed",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}