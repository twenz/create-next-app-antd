import { extractStyle } from "@ant-design/static-style-extract";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { doExtraStyle } from "../scripts/genAntdCss";
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    let fileName = '';
    // 2. extract style
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          const { router } = props;
          const page = <App {...props} />;
          // 2.1 extract style which had been used
          fileName = doExtraStyle({
            node: page,
            asPath: router.asPath,
          });
          return page;
        },
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {fileName && <link rel="stylesheet" href={`/${fileName}`} />}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
