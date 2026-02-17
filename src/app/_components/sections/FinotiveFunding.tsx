import { FC } from "react";
import { CountingNumber } from "@/components/ui/CountingNumber";
import { cn } from "@/lib/utils";

interface FinotiveFundingTypes {
  id: number;
  number: number;
  desc?: string;
}
const data: FinotiveFundingTypes[] = [
  {
    id: 1,
    number: 20,
    desc: "Active Member",
  },
  {
    id: 2,
    number: 150,
    desc: "Trusted By Company",
  },
  {
    id: 3,
    number: 7000,
    desc: "Our Target",
  },
];

const FinotiveFunding: FC = () => {
  return (
    <div className="md:w-[75%] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 pt- pb-10 md:py-10 font-heading">
      {data.map(({ id, number, desc }) => (
        <div
          key={id}
          className="w-full md:flex flex-wrap text-center items-center justify-center gap-2 border-primary border-2 md:border-0 rounded-lg px-5 py-1 md:p-0"
        >
          <h2 className="text-3xl md:text-5xl font-semibold md:font-bold text-text">
            <CountingNumber
              number={number}
              inView
              transition={{ duration: 3000 }}
              className={cn({
                'after:content-["M"] before:content-["$"]': id === 3,
              })}
            />
            +
          </h2>
          <p className="font-medium text-xl md:text-2xl text-primary text-nowrap">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FinotiveFunding;
