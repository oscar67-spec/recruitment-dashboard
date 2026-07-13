import { NextResponse } from "next/server";
import { fetchAllCandidates } from "@/lib/airtable";

export async function GET() {
  try {
    const candidates = await fetchAllCandidates();
    return NextResponse.json({ candidates });
  } catch (err: any) {
    console.error("Failed to fetch candidates:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
