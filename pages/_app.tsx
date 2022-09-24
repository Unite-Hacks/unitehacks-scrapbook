import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <BottomTabBar />
    </SessionProvider>
  );
}

export default MyApp;
