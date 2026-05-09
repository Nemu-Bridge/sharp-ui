#!/usr/bin/env node

const { readFileSync, writeFileSync, existsSync } = require("fs");
const { spawnSync } = require("child_process");
const { resolve } = require("path");

const registry_scope = "@nemu-ai";
const registry_url = "https://sharp.dragos.cc/r/{name}.json";
const cwd = process.cwd();
const components_json_path = resolve(cwd, "components.json");

const detect_package_manager = () => {
  if (existsSync(resolve(cwd, "bun.lock")) || existsSync(resolve(cwd, "bun.lockb"))) return "bun";
  if (existsSync(resolve(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(resolve(cwd, "yarn.lock"))) return "yarn";
  return "npm";
};

const detect_globals_css = () => {
  const candidates = [
    "app/globals.css",
    "src/app/globals.css",
    "styles/globals.css",
    "src/styles/globals.css",
    "app/global.css",
    "src/app/global.css",
  ];
  for (const p of candidates) {
    if (existsSync(resolve(cwd, p))) return p;
  }
  return "app/globals.css";
};

const detect_aliases_base = () => {
  try {
    const ts = JSON.parse(readFileSync(resolve(cwd, "tsconfig.json"), "utf-8"));
    const paths = ts?.compilerOptions?.paths ?? {};
    if (paths["@/*"]) return "@";
    if (paths["~/*"]) return "~";
  } catch {}
  return "@";
};

const read_config = () => {
  try {
    return JSON.parse(readFileSync(components_json_path, "utf-8"));
  } catch {
    return null;
  }
};

const is_valid_shadcn_config = (config) => {
  return config !== null && typeof config.$schema === "string" && config.aliases;
};

const build_components_json = () => {
  const css_path = detect_globals_css();
  const base = detect_aliases_base();
  return {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: css_path,
      baseColor: "slate",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: `${base}/components`,
      utils: `${base}/lib/utils`,
      ui: `${base}/components/ui`,
      lib: `${base}/lib`,
      hooks: `${base}/hooks`,
    },
    registries: {
      [registry_scope]: registry_url,
    },
  };
};

const run_shadcn = (package_manager, shadcn_args) => {
  const commands = {
    bun: { cmd: "bunx", args: ["--bun", ...shadcn_args] },
    pnpm: { cmd: "pnpm", args: ["dlx", ...shadcn_args] },
    yarn: { cmd: "yarn", args: ["dlx", ...shadcn_args] },
    npm: { cmd: "npx", args: shadcn_args },
  };

  const { cmd, args } = commands[package_manager];
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    cwd,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
};

const package_manager = detect_package_manager();
const existing_config = read_config();
const already_initialized = is_valid_shadcn_config(existing_config);

if (already_initialized) {
  existing_config.registries = {
    ...(existing_config.registries ?? {}),
    [registry_scope]: registry_url,
  };
  writeFileSync(components_json_path, JSON.stringify(existing_config, null, 2) + "\n");
} else {
  writeFileSync(components_json_path, JSON.stringify(build_components_json(), null, 2) + "\n");
}

run_shadcn(package_manager, ["shadcn@latest", "add", `${registry_scope}/utils`]);
