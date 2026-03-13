import Footer from "@/app/_components/shared/Footer";
import Header from "@/app/_components/shared/Header";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="absolute w-full h-240 -z-50 top-0"
        style={{
          backgroundImage: `radial-gradient(circle at 85% 30%, rgba(255, 191, 0, 0.08) 0, transparent 40%)`,
        }}
      />
      <Header />
      <main className="container md:px-10">{children}</main>
      <Footer />
    </>
  );
}
