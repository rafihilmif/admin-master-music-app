import Layout from "@/components/Layout";
import { useRouter } from 'next/router';
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      {router.pathname === '/' ? (
        <Component {...pageProps} />
      ) : (
          <Layout>
      <Component {...pageProps} />
    </Layout>
      )}
     </SessionProvider>
   
  );
}
export default MyApp;
