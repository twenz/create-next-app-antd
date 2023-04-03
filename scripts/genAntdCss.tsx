import fs from "fs";
import path from "path";
import { extractStyle } from "@ant-design/static-style-extract";
import withTheme from "../theme";

const outputDir = "./theme/output";
const outputCssFileName = "antd.min.css";

const outputCssPath = path.resolve(outputDir, outputCssFileName);

const displayPath = (name: string) => `${outputDir}/${name}`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. default theme

// const css = extractStyle();

// 2. With custom theme

const css = extractStyle(withTheme);

fs.writeFileSync(outputCssPath, css);

console.log(`🎉 Antd CSS generated at ${displayPath(outputCssFileName)}.`);
