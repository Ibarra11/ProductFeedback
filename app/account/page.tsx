import { redirect } from "next/navigation";
import UserProfileForm from "./UserProfileForm";
import { getCurrentUser } from "../lib/auth/session";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GoBackLink from "../components/GoBackLink";
export default async function Account() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }
  return (
    <div className="flex flex-col gap-2 justify-center max-w-2xl mx-auto w-full">
      <GoBackLink className="self-start">Go Back</GoBackLink>
      <div className="rounded bg-white p-8">
        <h1 className="mb-1 text-2xl font-semibold text-slate-700">Profile</h1>
        <p className="mb-8 text-slate-500">Manage settings for your profile</p>
        <UserProfileForm
          image={user.image ?? undefined}
          email={user.email ?? ""}
          name={user.name ?? ""}
        />
      </div>
    </div>
  );
}
