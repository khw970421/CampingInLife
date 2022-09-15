import "@/styles/global.css";
import Script from "next/script";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b486ce3c44e4b3af1415e2b20943c608&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
