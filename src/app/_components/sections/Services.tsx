"use client";

import { useState } from "react";
import { BanknoteArrowUp, LockKeyhole, ShieldUser } from "lucide-react";

const Services = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);

  const cardData = [
    {
      id: 1,
      icon: <ShieldUser />,
      head: "Keeping Security",
      desc: "We always maintain user confidentialy to keep it safe and confortable",
    },
    {
      id: 2,
      icon: <BanknoteArrowUp />,
      head: "Free Transaction",
      desc: "Free transactions without additional admin fees like other bank in general",
    },
    {
      id: 3,
      icon: <LockKeyhole />,
      head: "Security First",
      desc: "We always prioritize security so user don't have to warry about their savings",
    },
  ];

  return (
    <section className="relative">
      <div className="container py-4 md:py-32 px-4">
        <div className="text-center mb-5 md:mb-16">
          <h2 className="text-2xl md:text-5xl text-text font-bold mb-3 md:mb-8">
            We provide the best service for you
          </h2>
          <p className="md:text-xl leading-5 md:leading-6 px-3">
            We provide the best service for you. making for transactions and{" "}
            <br className="hidden md:block" /> managing your money
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-evenly items-center">
          {cardData.map(({ id, icon, head, desc }) => (
            <div
              key={id}
              className={`max-w-100 p-5 md:p-10 rounded-2xl flex flex-col items-start gap-2 md:gap-4 border border-black dark:border-white cursor-pointer hover:rotate-2 hover:scale-105 transition-all duration-300 ${
                selectedCard === id
                  ? "bg-black/25 dark:bg-white/15"
                  : "bg-black/10 dark:bg-white/5"
              }`}
              onClick={() => setSelectedCard(id)}
            >
              <span className="p-2 md:p-2.5 rounded-xl bg-primary">{icon}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-text">
                {head}
              </h2>
              <p className="text-sm md:text-lg font-medium leading-4 md:leading-6">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
