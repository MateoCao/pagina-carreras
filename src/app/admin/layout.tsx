import { NavbarAdmin } from "../components/NavbarAdmin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
        <NavbarAdmin />
        <section>
            {children}
        </section>
    </>
  );
}