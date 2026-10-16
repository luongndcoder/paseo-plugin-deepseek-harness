import { chmodSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginServerContext } from "@getpaseo/plugin/server";
import contribute from "../index.server.js";
import { findExecutable } from "./find-executable.js";

function binDir(withDsh: boolean, mode = 0o755): string {
  const dir = mkdtempSync(path.join(tmpdir(), "dsh-bin-"));
  if (withDsh) {
    const file = path.join(dir, "dsh");
    writeFileSync(file, "#!/bin/sh\n");
    chmodSync(file, mode);
  }
  return dir;
}

function fakeServer() {
  const registerProvider = vi.fn();
  return { server: { registerProvider } as unknown as PluginServerContext, registerProvider };
}

afterEach(() => vi.unstubAllEnvs());

describe("findExecutable", () => {
  it("finds an executable on PATH", () => {
    const dir = binDir(true);
    expect(findExecutable("dsh", { PATH: dir }, "linux")).toBe(path.join(dir, "dsh"));
  });

  it("returns null when missing or not executable", () => {
    expect(findExecutable("dsh", { PATH: binDir(false) }, "linux")).toBeNull();
    expect(findExecutable("dsh", { PATH: binDir(true, 0o644) }, "linux")).toBeNull();
    expect(findExecutable("dsh", {}, "linux")).toBeNull();
  });
});

describe("contribute", () => {
  it("registers the provider when dsh is installed", () => {
    vi.stubEnv("PATH", binDir(true));
    const { server, registerProvider } = fakeServer();
    contribute(server);
    expect(registerProvider).toHaveBeenCalledOnce();
  });

  it("skips registration when dsh is not installed", () => {
    vi.stubEnv("PATH", binDir(false));
    const { server, registerProvider } = fakeServer();
    contribute(server);
    expect(registerProvider).not.toHaveBeenCalled();
  });
});
