import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function UserProfile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className=" bg-white p-4">
      <div className="flex gap-4">
        <Image
          className="rounded-full"
          src={session.user?.image ?? "/user"}
          alt="user profile picture"
          width={32}
          height={32}
        />
        <div>
          <h3 className=" text-xl text-slate-700">{session.user?.name}</h3>
          <h4 className=" text-base text-slate-400">{session.user?.email}</h4>
        </div>
      </div>
    </div>
  );
}
