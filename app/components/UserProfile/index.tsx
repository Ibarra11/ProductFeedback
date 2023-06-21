"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "@/types";
import { FiLogOut } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";

export default async function UserProfile({ user }: { user: User }) {
  return (
    <div className="space-y-3 rounded-lg bg-white py-4">
      <div className="flex items-center gap-4 px-4">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={user.image || ""}
          alt={`${user.name} profile picture`}
        />
        <div>
          <h3 className=" text-xl font-semibold text-slate-700">{user.name}</h3>
          <h4 className=" text-sm text-slate-500">{user.email}</h4>
        </div>
      </div>
      {/* spacer */}
      <div className="h-px bg-slate-200"></div>
      <div className="flex flex-col gap-2 px-4 text-sm">
        <Link
          href={"/account"}
          className="group inline-flex items-center gap-2 rounded-sm py-1  text-slate-700 focus:outline-none focus:ring focus:ring-slate-500 active:bg-slate-100   "
        >
          <MdPersonOutline
            className=" font-bold group-hover:text-brand-purple"
            size={16}
          />
          <span className=" text-sm group-hover:text-brand-purple">
            Account Settings
          </span>
        </Link>
        <button
          onClick={() => signOut()}
          className="group inline-flex items-center  gap-2 rounded-sm  py-1"
        >
          <FiLogOut
            className=" font-bold group-hover:text-brand-purple"
            size={16}
          />
          <span className=" text-sm group-hover:text-brand-purple">
            Log out
          </span>
        </button>
      </div>
    </div>
  );
}
