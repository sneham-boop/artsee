import '@component/styles/globals.css'
import { Martian_Mono } from "next/font/google";
import MainLayout from '@component/components/MainLayout';
const martian = Martian_Mono({  weight: ['100', '400', '800'], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={martian.className}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </>
  );
}
