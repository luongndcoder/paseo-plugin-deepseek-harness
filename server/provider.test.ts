import { describe, expect, it } from "vitest";
import { createDeepSeekHarnessProvider } from "./provider.js";

describe("createDeepSeekHarnessProvider", () => {
  it("registers with id deepseek-harness and the acp launch command", () => {
    const provider = createDeepSeekHarnessProvider();
    expect(provider.id).toBe("deepseek-harness");
    expect(provider.label).toBe("DeepSeek Harness");
    expect(provider.icon).toBe("icon.svg");
    expect(typeof provider.connect).toBe("function");
  });
});
