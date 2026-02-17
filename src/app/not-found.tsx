import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/ui/Button";

export default function NotFound() {
  return (
    <section>
      <div className="min-h-screen container flex flex-col-reverse justify-center lg:flex-row items-center text-center">
        <div className="lg:w-1/2 space-y-3">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold">
            404 - error
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold">
            PAGE NOT FOUND
          </h3>
          <p className="sm:text-lg md:text-xl">
            Your search has ventured beyond the known universe.
          </p>
          <Link href="/">
            <Button variant={"outline"} className="mt-4 md:mt-7">
              Bact to home
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 md:flex justify-center">
          <Image
            src="/system/not-found.svg"
            width={500}
            height={500}
            priority
            alt="Not found page Image"
          />
        </div>
      </div>
    </section>
  );
}
