"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { BarsIcon, TimesIcon } from "@/icons";
import { MoveRight } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";

interface INavlist {
  link: string;
  label: string;
}
const Navlist: INavlist[] = [
  { link: "leaderboard", label: "Leaderboard" },
  { link: "gallery", label: "Gallery" },
  { link: "about", label: "About us" },
  { link: "contact", label: "Contact us" },
];

const Header: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 mt-5 md:mt-10 z-50">
      <div className="relative w-11/12 md:w-10/12 mx-auto p-0.5 px-2 md:p-3 rounded-md backdrop-blur-md bg-slate-300/10 flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-2 md:gap-14">
          <ul
            className={`absolute md:static h-0 md:h-auto w-full md:w-auto top-full left-0 overflow-hidden p-0 rounded-b-md bg-slate-300/30 md:bg-transparent md:flex items-center gap-2 md:gap-3 transition-all duration-300 ${
              navOpen && "h-36 p-1"
            }`}
          >
            {Navlist.map((list) => (
              <li key={list.link} onClick={() => setNavOpen(false)}>
                <Link
                  href={`/${list.link}`}
                  className="block px-2 py-1.5 text-[15px] text-nowrap text-white hover:text-primary hover:bg-primary/10 rounded-sm transition-all duration-300 cursor-pointer"
                >
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/profile">
            <Button>
              My Profile <MoveRight className="hidden lg:block ms-1.5" />
            </Button>
          </Link>

          <div
            className="md:hidden fill-primary stroke-primary hover:bg-white/10 rounded-full p-1.5 cursor-pointer"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <TimesIcon /> : <BarsIcon />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
