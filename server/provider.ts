import { runAcpProvider } from "@getpaseo/plugin/server/acp";
import type { ProviderRegistration } from "@getpaseo/plugin/server/provider";

export function createDeepSeekHarnessProvider(): ProviderRegistration {
  return runAcpProvider({
    id: "deepseek-harness",
    label: "DeepSeek Harness",
    description: "DeepSeek Harness coding agent over ACP (dsh --profile acp)",
    icon: "icon.svg",
    command: ["dsh", "--profile", "acp"],
  });
}
