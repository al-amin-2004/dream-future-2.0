import Image from "next/image";
import { Button } from "../ui/Button";
import robotHand from "@/../public/robothand.png";

const Hero = () => {
  return (
    <section>
      <div className="container h-screen flex flex-col lg:flex-row gap-10">
        {/* Left Side of Hero Section */}
        <div className="lg:flex-5/12 space-y-6 lg:space-y-9 mt-4 lg:mt-16">
          <p className="font-semibold text-xl lg:text-2xl text-primary">
            Digital Bank ___
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold md:font-bold lg:pe-20 md:leading-18">
            Smart Banking to Manage Your Money & Transections
          </h2>
          <p className="md:text-xl">
            A fast, secure, and smart way to deposit, track expenses, and manage
            your money — all in one platform.
          </p>

          <div className="space-x-10">
            <Button variant="outline">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        {/* Right Side of Hero Section */}
        <div className="lg:flex-1/2 w-full flex flex-col items-center lg:mt-20">
          <Image
            src="/logos/dream-future-logo-white.png"
            width={500}
            height={500}
            alt="robothand Image"
            className="md:translate-x-16 w-[clamp(15rem,40vw,25rem)] md:hidden lg:block"
          />

          <Image
            src={robotHand}
            width={1000}
            height={500}
            priority
            fetchPriority="high"
            alt="robothand Image"
            className="absolute right-0 bottom-10 lg:w-[clamp(20rem,50vw,55rem)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
