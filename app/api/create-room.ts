"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

// TODO Make sure only staff can create room
export async function createRoom({ room }: any) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.from("room").insert([room]).select();

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/rooms");

  return { message: "Success" };
}
