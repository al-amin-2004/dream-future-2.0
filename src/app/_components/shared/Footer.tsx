import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <section className="max-w-11/12 mx-auto p-4 md:p-10 bg-background rounded-b-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        <div className="space-y-4 md:space-y-5 sm:col-span-2 md:col-span-3 xl:col-span-2">
          <Logo /> 

          <p>Manage your finances seamlessly and take control of your money.</p>
          <div className="flex gap-3">
            <Link href="">
              <Youtube />
            </Link>
            <Link href="">
              <Facebook />
            </Link>
            <Link href="">
              <Twitter />
            </Link>
          </div>

          <div className="mt-6 md:mt-12">
            <h5 className="font-bold bg-white inline text-background p-1 pe-15 rounded-[15%_40%/40%_15%]">Address:</h5>
            <address className="text-sm ms-5 mt-2.5">203 Fake St. Mountain View, San Francisco, California, USA</address>
          </div>
        </div>

        <div>
          <h5 className="font-bold bg-primary inline text-background p-1 pe-20 rounded-[15%_40%/40%_15%]">Menu</h5>
          <ul className="text-sm space-y-1.5 mt-3">
            <li>Leaderboard</li>
            <li>Gallery</li>
            <li>About us</li>
            <li>Contac us</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold bg-primary inline text-background p-1 pe-20 rounded-[15%_40%/40%_15%]">Join us</h5>
          <ul className="text-sm space-y-1.5 mt-3">
            <li>Leaderboard</li>
            <li>About us</li>
            <li>Contac us</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold bg-primary inline text-background p-1 pe-20 rounded-[15%_40%/40%_15%]">Others</h5>
          <ul className="text-sm space-y-1.5 mt-3">
            <li>Dream Team</li>
            <li>Terms of Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </section>

      <p className="text-background text-center p-4 font-semibold">Copyright © 2026 Dream Future - All rights reserved.</p>
    </footer>
  );
};

export default Footer;
