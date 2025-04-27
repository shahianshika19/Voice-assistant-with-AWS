import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { text }: { text: string } = await request.json();

        const prompt = `Analyze the sentiment of the following text and provide the sentiment (Positive, Negative, Neutral) and confidence level (Structure like this: "Sentiment: Positive, Confidence: 0.95"): "${text}"`;
        const res = await model.generateContent(prompt);

        const responseText = res.response?.text();

        return NextResponse.json({ success: true, result: responseText }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error analyzing sentiment with Gemini API:", error);

        return NextResponse.json(
            { success: false, error: "Failed to analyze sentiment." },
            { status: 500 }
        );
    }
}
