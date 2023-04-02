import "../styles/globals.css";
import type { AppProps } from "next/app";
import withTheme from "../theme";
import { extractStyle } from "@ant-design/static-style-extract";
// 2. import extra css file in js
// import "../theme/output/antd.min.css";

export default function App({ Component, pageProps }: AppProps) {
  
  // 1.1 inject style into html to optimize the first screen rendering experience
  const antdStyle = extractStyle(() => withTheme(<Component {...pageProps} />));
  // PS: extra the full style
  // const antdStyle = extractStyle((node) => withTheme(<><Component {...pageProps} />{node}</>));

  return (
    <>
      {/* 1.2 inject style into html */}
      <style jsx global>{`
        ${antdStyle}
      `}</style>
      {withTheme(<Component {...pageProps} />)}
    </>
  );
}
