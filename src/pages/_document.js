import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Script src="https://maps.googleapis.com/maps/api/js?sensor=false" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
