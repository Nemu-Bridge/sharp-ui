#!/usr/bin/env node

const { readFileSync, writeFileSync, existsSync, unlinkSync } = require("fs");
const { spawnSync } = require("child_process");
const { resolve } = require("path");

const registry_scope = "@nemu-ai";
const registry_url = "https://sharp.dragos.cc/r";
const init_url = `${registry_url}/sharp-ui.json`;
const cwd = process.cwd();
const components_json_path = resolve(cwd, "components.json");

const detect_package_manager = () => {
  if (existsSync(resolve(cwd, "bun.lock")) || existsSync(resolve(cwd, "bun.lockb"))) return "bun";
  if (existsSync(resolve(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(resolve(cwd, "yarn.lock"))) return "yarn";
  return "npm";
};

const read_config = () => {
  try {
    return JSON.parse(readFileSync(components_json_path, "utf-8"));
  } catch {
    return null;
  }
};

const is_valid_shadcn_config = (config) => {
  return config !== null && typeof config.$schema === "string";
};

const write_registry = () => {
  const config = read_config();
  if (!config) return;
  config.registries = { ...(config.registries ?? {}), [registry_scope]: registry_url };
  writeFileSync(components_json_path, JSON.stringify(config, null, 2) + "\n");
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

if (existsSync(components_json_path) && !already_initialized) {
  unlinkSync(components_json_path);
}

if (already_initialized) {
  write_registry();
  run_shadcn(package_manager, ["shadcn@latest", "add", `${registry_scope}/utils`]);
} else {
  run_shadcn(package_manager, ["shadcn@latest", "init", init_url]);
  write_registry();
}
