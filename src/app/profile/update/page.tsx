"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/providers/UserContext";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import Label from "@/app/_components/ui/Label";
import z from "zod";
import { updateProfileScema } from "@/schemas/updateProfileScema";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { country, gender } from "@/constants/user";

const UpdateProfile = () => {
  const { user, refreshUser } = useUser();
  const [profilePic, setProfilePic] = useState<File | string | null>(null);
  const [avatarId, setAvatarId] = useState<string>("");

  type UpdateProfileFormData = z.infer<typeof updateProfileScema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileScema),
  });

  console.log(user);

  // load Initial data
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        number: user.number || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        address: user.address || "",
        birthday: user.dob
          ? new Date(user.dob).toISOString().split("T")[0]
          : "",
      });
    }

    setProfilePic(user?.avatar || null);
    setAvatarId(user?.avatarId || "");
  }, [user, reset]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      let uploadedImageUrl = typeof profilePic === "string" ? profilePic : "";
      let uploadedPublicId = avatarId;

      if (profilePic && profilePic instanceof File) {
        const imgForm = new FormData();
        imgForm.append("file", profilePic);

        if (avatarId) {
          imgForm.append("oldPublicId", avatarId);
        }

        const res = await fetch("", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();

        if (data.success) {
          uploadedImageUrl = data.result.secure_url;
          uploadedPublicId = data.result.publicId;
        }
      }

      //   if (!res.ok) throw new Error("Failed to update User");

      toast.success("Profile updated successfully!");
      refreshUser();
      reset(data);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update Profile!");
    } finally {
    }
  };
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePageTitle
        title="Settings"
        description="Showing your all histories with a clear view."
      />

      <motion.div variants={fadeUp} className="md:max-w-9/12 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Profile Picture */}
          <div className="relative w-fit">
            <div className="size-42 mb-2 rounded-full overflow-hidden border-2 border-gray-300">
              {profilePic ? (
                <Image
                  src={
                    typeof profilePic === "string"
                      ? profilePic
                      : URL.createObjectURL(profilePic)
                  }
                  width={500}
                  height={500}
                  priority
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : user?.avatar ? (
                <Image
                  src={user?.avatar}
                  width={500}
                  height={500}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center h-full">
                  No Image
                </div>
              )}
            </div>

            <Label
              htmlFor="avatar-upload"
              className="absolute bottom-2 right-2 p-1.5 bg-[#797777] ring-4 ring-background text-primary rounded-full cursor-pointer"
            >
              <Camera className="size-5" />
            </Label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-gray-200 mb-1">First Name</Label>
              <Input {...register("firstName")} />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </div>
            <div>
              <Label className="block text-gray-200 mb-1">Last Name</Label>
              <Input {...register("lastName")} />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>
          </div>

          {/* Number & Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-gray-200 mb-1">Phone Number</Label>
              <Input {...register("number")} />
              {errors.number && (
                <ErrorMessage>{errors.number.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Label className="block text-gray-200 mb-1">Date of Birth</Label>
              <Input type="date" {...register("birthday")} />
              {errors.birthday && (
                <ErrorMessage>{errors.birthday.message}</ErrorMessage>
              )}
            </div>
          </div>

          {/* Nationality & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Nationality</label>
              <select
                {...register("nationality")}
                className="w-full p-2 bg-background border rounded-md"
              >
                <option value="">Select</option>
                {country.map((country) => (
                  <option key={country} value={country} className="capitalize">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-200 mb-1">Gender</label>
              <select
                {...register("gender")}
                className="w-full p-2 bg-background border rounded-md"
              >
                <option value="">Select</option>
                {gender.map((gender) => (
                  <option key={gender} value={gender} className="capitalize">
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-200 mb-1">Address</label>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="w-full rounded hover:translate-0"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProfile;
