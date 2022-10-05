import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import Meta from "../components/Meta";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
      <BottomTabBar />
    </SessionProvider>
  );
}

export default MyApp;
