import { NextRequest, NextResponse } from "next/server";
import registry from "@/registry.json";

export async function GET(request: NextRequest) {
  const origin =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  const items = registry.items.map((item) => ({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    url: `${origin}/r/${item.name}`,
  }));

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: registry.name,
      homepage: registry.homepage,
      items,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
