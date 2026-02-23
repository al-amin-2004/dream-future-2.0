"use client";

import Image from "next/image";
import { toast } from "sonner";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useUser } from "@/providers/UserContext";
import { useAccounts } from "@/providers/AccountContext";
import UserDetailsList from "@/app/_components/ui/UserDetailsList";
// import RequestForm from "./_components//RequestForm";
import { Loading2 } from "@/icons";
import { motion } from "framer-motion";
import { fadeUp, fade, stagger } from "@/lib/motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../_components/ui/Button";

const Profile = () => {
  const { user, loading } = useUser();
  const { activeAccount } = useAccounts();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-85px)]">
        <Loading2 />
      </div>
    );

  if (!user) {
    toast.error("No user data found!");
    return;
  }

  const {
    firstName,
    lastName,
    username,
    email,
    number,
    avatar,
    gender,
    dob,
    address,
    nationality,
  } = user;

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      className="space-y-5 md:space-y-12"
    >
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePageTitle
        title="Profile"
        description="View all your profile details here."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Top left side */}
        <motion.div
          variants={fadeUp}
          className="flex-2 border-2 p-6 rounded-xl flex flex-col items-center"
        >
          <h1 className="text-4xl font-semibold">{`${firstName} ${lastName}`}</h1>
          <p className="text-primary mb-5">{username}</p>
          <div className="md:size-99 border-6 md:border-18 border-primary rounded-full overflow-hidden flex justify-center items-center">
            {avatar ? (
              <Image
                src={avatar}
                width={500}
                height={500}
                priority
                alt="User Profile Page"
              />
            ) : (
              <span className="text-[10rem]">
                {firstName.slice(0, 1) + lastName?.slice(0, 1)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Top right side */}
        <motion.div variants={fadeUp} className="flex-3 flex flex-col gap-8 ">
          {false ? (
            <div className="border-2 p-3.5 md:p-6 rounded-xl">
              <div className="flex justify-between py-3 border-b">
                <h1 className="text-xl font-semibold">Balance quiry</h1>

                {activeAccount?.status === "active" ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="size-4 text-green-500 relative">
                        <span className="absolute inset-0 bg-current rounded-full opacity-50 animate-ping"></span>
                        <span className="absolute inset-0.5 bg-current rounded-full"></span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Account Actived 😊</span>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="size-4 bg-red-500 rounded-full" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Account Blocked 😔</span>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6">
                <div className="p-2.5 md:p-3 space-y-2.5 rounded-xl bg-yellow-500/30">
                  <h3 className="text-sm text-yellow-500">Total Deposit</h3>
                  <p className="text-2xl font-bold">
                    $ {activeAccount?.totalDeposit}
                  </p>
                </div>
                <div className="p-2.5 md:p-3 space-y-2.5 rounded-xl bg-green-500/20">
                  <h3 className="text-sm text-green-500">Profit</h3>
                  <p className="text-2xl font-bold">
                    $ {activeAccount?.totalProfit}
                  </p>
                </div>
                <div className="p-2.5 md:p-3 space-y-2.5 rounded-xl bg-blue-500/20 col-span-2 lg:col-span-1">
                  <h3 className="text-sm text-blue-500">Total Balance</h3>
                  <p className="text-2xl font-bold">
                    $ {activeAccount?.balance}.00
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 p-3.5 md:p-6 rounded-xl flex justify-end">
              <Button>Open an Account</Button>
            </div>
          )}

          <div className="border-2 p-3.5 md:p-6 rounded-xl flex-3">
            <h1 className="text-xl font-semibold py-3 border-b">
              Bio & others details
            </h1>

            <ul className="lg:grid grid-cols-2 pt-3">
              <UserDetailsList label="Email" value={email} />
              <UserDetailsList label="Phone" value={number} />
              <UserDetailsList
                label="Date of Birth"
                value={dob instanceof Date ? dob.toLocaleDateString() : dob}
              />
              <UserDetailsList
                label="Gender"
                value={gender}
                className="capitalize"
              />
              <UserDetailsList label="Blood" value={"ab"} />
              <UserDetailsList
                label="Nationality"
                value={nationality}
                className="capitalize"
              />
              <UserDetailsList
                label="Address"
                value={address}
                className="col-start-1 col-end-3"
              />
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* <RequestForm /> */}
    </motion.div>
  );
};

export default Profile;
