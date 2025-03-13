import Navbar from "./components/Navbar";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Suspense } from "react";
import { getSections } from "./utils/getSections";
config.autoAddCss = false

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fallbackData = await getSections();

  return (
    <html lang="en">
      <body className="flex w-dvw">
        <aside>
          <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>
          }>
            <Navbar fallbackData={fallbackData} />
          </Suspense>
        </aside>
        <main className="bg-black text-white w-full p-5">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}