import { ArrowLeft } from "lucide-react";
import { Logo } from "../_components/ui/Logo";
import Link from "next/link";
import style from "@/styles/rippleButton.module.css";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden">
      <div
        className="absolute w-full h-240 -z-50 top-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 2%, rgba(255, 191, 0, 0.25) 0, transparent 25%)`,
        }}
      />

      {/* Authentication page header */}
      <header className="fixed w-full z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" type="button" className={style.rippleButton}>
            <ArrowLeft color="var(--primary)" />
          </Link>

          <Logo />
        </div>
      </header>

      {/* Authentication page main content */}
      <section className="min-h-screen flex justify-center md:items-center px-4 md:px-2 perspective-[1000px]">
        {children}
      </section>
    </main>
  );
}
