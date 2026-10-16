import { describe, expect, it, vi } from "vitest";
import { execCommand } from "@getpaseo/plugin/server";
import { createDeepSeekHarnessProvider } from "./provider.js";

vi.mock("@getpaseo/plugin/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@getpaseo/plugin/server")>()),
  execCommand: vi.fn(),
}));

const execCommandMock = vi.mocked(execCommand);

describe("createDeepSeekHarnessProvider", () => {
  it("registers with id deepseek-harness and correct command", () => {
    const provider = createDeepSeekHarnessProvider();
    expect(provider.id).toBe("deepseek-harness");
    expect(provider.label).toBe("DeepSeek Harness");
    expect(provider.icon).toBe("icon.svg");
    expect(provider.command).toEqual(["dsh", "--profile", "acp"]);
    expect(typeof provider.connect).toBe("function");
    expect(typeof provider.status).toBe("function");
  });

  it("reports unavailable if launch is not provided", async () => {
    const provider = createDeepSeekHarnessProvider();
    const result = await provider.status?.({ launch: undefined });
    expect(result).toEqual({
      available: false,
      diagnostic:
        "dsh not found on PATH. Install DeepSeek Harness CLI: `npm i -g @deepseek-ai/dsh`",
    });
  });

  it("reports available when dsh -V returns version", async () => {
    execCommandMock.mockResolvedValue({
      stdout: "0.2.0-rc.2\n",
      stderr: "",
    } as Awaited<ReturnType<typeof execCommand>>);

    const provider = createDeepSeekHarnessProvider();
    const result = await provider.status?.({
      launch: {
        command: "dsh",
        args: ["--profile", "acp"],
        env: {},
      },
    });

    expect(result).toEqual({ available: true });
    expect(execCommandMock).toHaveBeenCalledWith(
      "dsh",
      ["--profile", "acp", "-V"],
      expect.objectContaining({ timeout: 4000 }),
    );
    execCommandMock.mockReset();
  });

  it("reports unavailable when probe fails", async () => {
    execCommandMock.mockRejectedValue(new Error("ENOENT"));

    const provider = createDeepSeekHarnessProvider();
    const result = await provider.status?.({
      launch: {
        command: "dsh",
        args: ["--profile", "acp"],
        env: {},
      },
    });

    expect(result).toEqual({
      available: false,
      diagnostic: "ENOENT",
    });
    execCommandMock.mockReset();
  });
});
