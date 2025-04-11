import { Inter } from "next/font/google";
import "./globals.css";
import Header_component from "./component/Header";
import CustomProviders from "@/StoreConfiguration/CustomProviders";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Blog ",
  // description: "Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body className={`${inter.className} bg-white`}>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          //       template='<div className="bar" role="bar"><div className="peg"></div></div>
          // <div className="spinner" role="spinner"><div className="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <CustomProviders>
          <>{children}</>
        </CustomProviders>
      </body>
    </html>
  );
}
