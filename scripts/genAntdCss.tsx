import fs from "fs";
import path from "path";
import { extractStyle } from "@ant-design/static-style-extract";
import withTheme from "../theme";

const outputDir = "./theme/output";
const outputStyleFileName = "antdStyle.ts";
const outputCssFileName = "antd.min.css";

const outputStylePath = path.resolve(outputDir, outputStyleFileName);
const outputCssPath = path.resolve(outputDir, outputCssFileName);

const displayPath = (name: string) => `${outputDir}/${name}`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. default theme

// const css = extractStyle();

// 2. With custom theme

const css = extractStyle(withTheme);

fs.writeFileSync(outputStylePath, `export default \`${css.replace(/\\/g, '\\\\')}\``);
fs.writeFileSync(outputCssPath, css);

console.log(`🎉 Antd CSS generated at \n- ${displayPath(outputStyleFileName)}: if you want to inject style into html to optimize the first screen rendering experience.\n- ${displayPath(outputCssFileName)}: If you want to import extra css file in js.`);
