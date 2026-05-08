import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import registry from "@/registry.json";

const INTERNAL_DEPS = new Set(registry.items.map((item) => item.name));

function getOrigin(request: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const item = registry.items.find((i) => i.name === name);
  if (!item) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  const origin = getOrigin(request);

  const files = item.files.map((file) => {
    let content = "";
    try {
      content = readFileSync(join(process.cwd(), file.path), "utf-8");
    } catch {}
    return { path: file.path, type: file.type, target: file.target, content };
  });

  const registryDependencies =
    "registryDependencies" in item && item.registryDependencies
      ? item.registryDependencies.map((dep) =>
          INTERNAL_DEPS.has(dep) ? `${origin}/r/${dep}` : dep,
        )
      : [];

  const payload: Record<string, unknown> = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
  };

  if (item.title) payload.title = item.title;
  if (item.description) payload.description = item.description;
  if ("dependencies" in item && item.dependencies?.length)
    payload.dependencies = item.dependencies;
  if (registryDependencies.length)
    payload.registryDependencies = registryDependencies;

  payload.files = files;

  return NextResponse.json(payload, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
