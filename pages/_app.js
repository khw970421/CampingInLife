import "@/styles/global.css";
import Script from "next/script";
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Camping In Life</title>
      </Head>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b486ce3c44e4b3af1415e2b20943c608&libraries=services,clusterer&autoload=false"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
