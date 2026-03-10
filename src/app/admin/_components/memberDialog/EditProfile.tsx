"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { IUser } from "@/types";
import { Button } from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Label from "@/app/_components/ui/Label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adminUpdateUserSchema } from "@/schemas/adminUpdateUserScema";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { country, gender } from "@/constants/user";
import { Camera } from "lucide-react";
import { useAllUsers } from "@/providers/AllUsersContext";

interface EditProfileProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ user, open, onClose }) => {
  const { refreshUsers } = useAllUsers();
  const [profilePicChanged, setProfilePicChanged] = useState(false);

  type AdminUpdateprofileData = z.infer<typeof adminUpdateUserSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AdminUpdateprofileData>({
    resolver: zodResolver(adminUpdateUserSchema),
  });

  // load Initial data
  useEffect(() => {
    if (user) {
      reset({
        avatar: user.avatar || "",
        avatarId: user.avatarId || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        number: user.number || "",
        nationality: user.nationality || "",
        address: user.address || "",
        gender: user.gender || "male",
        isVerifiedEmail: user.isVerifiedEmail ?? false,
        isVerifiedNumber: user.isVerifiedNumber ?? false,
        birthday: user.dob
          ? new Date(user.dob).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user, reset]);

  const avatar = watch("avatar");
  const avatarId = watch("avatarId");

  const onSubmit = async (data: AdminUpdateprofileData) => {
    try {
      let uploadedImageUrl = typeof avatar === "string" ? avatar : "";
      let uploadedPublicId = avatarId;

      if (avatar && !(typeof avatar === "string")) {
        const imgForm = new FormData();
        imgForm.append("file", avatar);

        if (avatarId) {
          imgForm.append("oldPublicId", avatarId);
        }

        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();

        if (data.success) {
          uploadedImageUrl = data.result.secure_url;
          uploadedPublicId = data.result.public_id;
        }
      }

      const res = await fetch(`/api/admin/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: user?._id,
          avatar: uploadedImageUrl,
          avatarId: uploadedPublicId,
        }),
      });

      if (!res.ok) {
        toast.error("Update failed!");
        return;
      }

      toast.success("User Profile updated successfully.");
      reset(data);
      refreshUsers();
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update Profile!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Member Profile</DialogTitle>
          <DialogDescription className="border-b pb-3">
            Update member information.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center">
          {avatar ? (
            <Image
              src={
                typeof avatar === "string"
                  ? avatar
                  : URL.createObjectURL(avatar)
              }
              width={200}
              height={200}
              priority
              alt="Profile"
              className="size-16 rounded-full"
            />
          ) : user?.avatar ? (
            <Image
              src={user?.avatar}
              width={200}
              height={200}
              alt="Profile"
              className="size-16 rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              No Avatar
            </div>
          )}

          <div>
            <Label
              htmlFor="avatar-upload"
              className="p-1.5 hover:bg-white/10 rounded cursor-pointer"
            >
              <Camera className="size-5" />
            </Label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("avatar", URL.createObjectURL(file));
                  setProfilePicChanged(true);
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <select
              className="w-full p-2 bg-background border rounded-md"
              {...register("gender")}
            >
              {gender.map((gender) => (
                <option key={gender} value={gender} className="capitalize">
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Verified Email */}
          <div className="h-9.5 flex items-center justify-between border px-3 rounded-md self-end">
            <Label className="mb-0">Email Verified</Label>
            <Input
              type="checkbox"
              {...register("isVerifiedEmail")}
              className="size-4"
            />
          </div>

          {/* Number */}
          <div>
            <Label htmlFor="number">Number</Label>
            <Input id="number" {...register("number")} />
            {errors.number && (
              <ErrorMessage>{errors.number.message}</ErrorMessage>
            )}
          </div>

          {/* Verified Number */}
          <div className="h-9.5 flex items-center justify-between border px-3 rounded-md self-end">
            <Label className="mb-0">Number Verified</Label>
            <Input
              type="checkbox"
              {...register("isVerifiedNumber")}
              className="size-4"
            />
          </div>

          {/* Date of Birth*/}
          <div>
            <Label>Birth Date</Label>
            <Input type="date" {...register("birthday")} />
            {errors.birthday && (
              <ErrorMessage>{errors.birthday.message}</ErrorMessage>
            )}
          </div>

          {/* Nationality */}
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <select
              id="nationality"
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
            {errors.nationality && (
              <ErrorMessage>{errors.nationality.message}</ErrorMessage>
            )}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={(!isDirty || isSubmitting) && !profilePicChanged}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
