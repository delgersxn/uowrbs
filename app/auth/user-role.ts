import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserRole(id: any) {
  const supabase = createClient();

  const { data: staff, error } = await supabase
    .from("staff")
    .select("is_staff")
    .eq("id", id)
    .single();

  if (!staff?.is_staff) {
    return redirect("/booking");
  }

  return;
}
