import { NextResponse } from "next/server"
import { getPortfolioData } from "@/lib/data-provider"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
      },
    })
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
