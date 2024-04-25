"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function CancelBooking(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("booking").delete().eq("id", id);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/student/mybookings");

  return { message: "Success" };
}
