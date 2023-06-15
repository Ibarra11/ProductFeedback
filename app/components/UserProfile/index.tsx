import Image from "next/image";
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
      <div className="flex flex-col gap-2 border-2 border-red-400  px-4 text-sm">
        <button className="inline-flex items-center gap-2 border-2 border-red-500 ">
          <MdPersonOutline /> <span>Account Settings</span>
        </button>
        <button className=" inline-flex items-center gap-2  border-2 border-red-400">
          <FiLogOut />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
