import "@/styles/globals.css";
import Head from "next/head";
import { Antonio } from "next/font/google";
import { Toaster } from "react-hot-toast";

const antonio = Antonio({
  weight: ["100", "300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-antonio",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main className={`${antonio.variable} font-sans`}>
        <Component {...pageProps} />
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </>
  );
}
