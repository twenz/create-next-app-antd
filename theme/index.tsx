import React from "react";
import { ConfigProvider } from "antd";

const primary = "#3891F4";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
