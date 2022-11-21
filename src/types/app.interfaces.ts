import { NextPage, NextPageContext } from "next";
import { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  auth?: boolean;
};

export type MyAppProps = AppProps & {
  Component: NextPageWithLayout;
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
};
