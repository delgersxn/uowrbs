"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

// TODO Make sure only admin can approve room
export async function approveRoom(id: number) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("room")
    .update({ approved: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/rooms");

  return { message: "Success" };
}
