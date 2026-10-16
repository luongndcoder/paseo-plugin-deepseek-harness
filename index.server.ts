import type { PluginServerContext } from "@getpaseo/plugin/server";
import { findExecutable } from "./server/find-executable.js";
import { createDeepSeekHarnessProvider } from "./server/provider.js";

// Paseo 0.10 has no provider availability hook, so the provider is registered only when
// `dsh` is on the daemon's PATH. Install dsh and restart the daemon to enable it.
export default function contribute(server: PluginServerContext) {
  if (findExecutable("dsh") === null) {
    return () => {};
  }
  server.registerProvider(createDeepSeekHarnessProvider());
  return () => {};
}
