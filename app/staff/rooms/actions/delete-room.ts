"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function DeleteRoom(id: number) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("room").delete().eq("id", id);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/rooms");

  return { message: "Success" };
}
