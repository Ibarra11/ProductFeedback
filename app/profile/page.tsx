import { redirect } from "next/navigation";
import UserProfileForm from "./UserProfileForm";
import { getCurrentUser } from "../lib/auth/session";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  return (
    <div className=" grid items-center">
      <div className="mx-auto  w-full max-w-2xl rounded bg-white  p-8">
        <h1 className="mb-1 text-2xl font-semibold text-slate-700">Profile</h1>
        <p className="mb-8 text-slate-500">Manage settings for your profile</p>
        <UserProfileForm
          image={user.image ?? undefined}
          email={user.email ?? ""}
          username={user.name ?? ""}
        />
      </div>
    </div>
  );
}
