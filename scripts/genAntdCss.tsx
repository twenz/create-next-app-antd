import fs from "fs";
import path from "path";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs"
import { renderToString } from "react-dom/server"
import { createHash } from "crypto";

const styleTagReg = /<style[^>]*>([\s\S]*?)<\/style>/g;

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

  if (!fs.existsSync(outputCssPath)) {
    fs.mkdirSync(outputCssPath, { recursive: true });
  }

  const cache = createCache();

  renderToString(<StyleProvider cache={cache}>{node}</StyleProvider>);
  const cssText = extractStyle(cache);
  const css = cssText.replace(styleTagReg, '$1');

  const md5 = createHash("md5");
  const hash = md5.update(css).digest("hex");
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`;
  const fullpath = path.join(outputCssPath, fileName);

  const res = `_next/static/css/${dir}/${fileName}`;

  if (fs.existsSync(fullpath)) return res;

  fs.writeFileSync(fullpath, css);

  return res;
}
