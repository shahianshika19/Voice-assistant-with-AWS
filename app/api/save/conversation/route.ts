import { NextRequest, NextResponse } from "next/server";
import { ProductFeedback } from "@/models/models";

export const dynamic = 'force-dynamic'; // Optional for forcing dynamic route behavior

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { userId, productName, feedback, sentiment, score } = await req.json();

        const newFeedback = new ProductFeedback({
            userId,
            productName,
            feedback: { text: feedback, sentiment, score },
        });

        await newFeedback.save();

        return NextResponse.json({ success: true, data: newFeedback }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    console.log(req)
    return NextResponse.json({ message: "GET requests are not supported on this route" }, { status: 405 });
}
