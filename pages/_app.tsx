import "../styles/globals.css";
import type { AppProps } from "next/app";
import withTheme from "../theme";
// 1.1 inject style into html to optimize the first screen rendering experience
import antdStyle from "../theme/output/antdStyle";
// 2. import extra css file in js
// import "../theme/output/antd.min.css";

export default function App({ Component, pageProps }: AppProps) {
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
