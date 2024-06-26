import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
const sarabun = Sarabun({subsets:["latin"], weight:["100","200","300","400", "500", "600","700","800"]})

export const metadata = {
  title: "Art&Craft Eshop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={sarabun.className}>
        <div className="container mx-auto p-2 max-w-full md:max-w-7xl">
          <Navbar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
