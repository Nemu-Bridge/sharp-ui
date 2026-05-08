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
    dependencies: "dependencies" in item ? item.dependencies : undefined,
    registryDependencies:
      "registryDependencies" in item ? item.registryDependencies : undefined,
    files: item.files,
  }));

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: registry.name,
      homepage: registry.homepage,
      url: `${origin}/r/{name}`,
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
