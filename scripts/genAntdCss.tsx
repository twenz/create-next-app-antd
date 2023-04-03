import fs from "fs";
import path from "path";
import { extractStyle } from "@ant-design/static-style-extract";
import withTheme from "../theme";
import { createHash } from "crypto";

export type DoExtraStyleOptions = {
  node: React.ReactElement;
  asPath: string;
  dir?: string;
  baseFileName?: string;
  baseDir?: string;
};
export function doExtraStyle({
  node,
  asPath,
  dir = "antd-output",
  baseFileName = "antd.min",
}: DoExtraStyleOptions) {
  if (asPath.endsWith(".json")) return "";
  
  const baseDir = path.resolve(__dirname, "../../static/css");
  
  const outputCssPath = path.join(baseDir, dir);

  // clean
  if (fs.existsSync(outputCssPath)) {
    fs.rmdirSync(outputCssPath);
  }
  
  fs.mkdirSync(outputCssPath, { recursive: true });

  // 1. default theme

  // const css = extractStyle();

  // 2. With custom theme

  const css = extractStyle(() => withTheme(node));

  const md5 = createHash("md5");
  const hash = md5.update(css).digest("hex");
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`;
  const fullpath = path.join(outputCssPath, fileName);

  fs.writeFileSync(fullpath, css);

  return `_next/static/css/${dir}/${fileName}`;
}
