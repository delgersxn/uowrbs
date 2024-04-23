"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createRoom({ room }: any) {
  const supabase = createClient();

  const { data, error } = await supabase.from("room").insert([room]).select();

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/dashboard");

  return { message: "Success" };
}
