import { Provider } from "react-redux";
import Layout from "@/layout/Layout";
import Router from "next/router";
import store from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
