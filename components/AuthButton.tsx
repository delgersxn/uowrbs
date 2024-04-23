import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hello, {user?.email}!
      <form action={signOut}>
        <button className="btn btn-ghost">Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="btn btn-ghost">
      Login
    </Link>
  );
}
