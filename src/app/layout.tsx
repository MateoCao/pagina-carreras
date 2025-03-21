import Navbar from "./components/Navbar";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Elegí los pesos que necesites
  style: ["normal", "italic"],
});
config.autoAddCss = false



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${roboto.className} flex`}>
        <aside>
          <Navbar />
        </aside>
        <main className="bg-black text-white w-full min-h-screen ml-60">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}