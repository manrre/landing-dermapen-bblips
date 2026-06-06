import "server-only";

import { existsSync } from "fs";
import { join } from "path";

export async function getAssetAvailability(paths: string[]) {
  return Object.fromEntries(
    paths.map((assetPath) => {
      const normalizedPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
      const absolutePath = join(process.cwd(), "public", normalizedPath.replace(/^public\//, ""));
      return [assetPath, existsSync(absolutePath)];
    }),
  );
}
