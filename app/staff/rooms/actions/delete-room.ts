"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function DeleteRoom(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("room").delete().eq("id", id);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/rooms");

  return { message: "Success" };
}
