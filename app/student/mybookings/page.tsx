import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function MyBookings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: staff, error } = await supabase
    .from("staff")
    .select("is_staff")
    .eq("id", user.id)
    .single();

  if (staff?.is_staff) {
    return redirect("/staff/rooms");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {/* <Header /> */}
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {/* <FetchDataSteps /> */}
        </main>
      </div>
    </div>
  );
}
