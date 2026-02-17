import Hero from "./_components/sections/Hero";
import Header from "./_components/shared/Header";

export default function Home() {
  return (
    <>
      <div
        className="absolute w-full h-240 -z-50 top-0"
        style={{
          backgroundImage: `radial-gradient(circle at 85% 30%, rgba(255, 191, 0, 0.08) 0, transparent 40%)`,
        }}
      />
      <Header />
      <Hero/>
    </>
  );
}
