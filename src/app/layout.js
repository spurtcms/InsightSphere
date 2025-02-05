import { Inter } from "next/font/google";
import "./globals.css";
import Header_component from "./component/Header";
import CustomProviders from "@/StoreConfiguration/CustomProviders";

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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"></link>


      </head>
      <body className={`${inter.className} bg-white`}>
        <CustomProviders>
          <>
            {children}
          </>
        </CustomProviders>
      </body>
    </html>
  );
}
