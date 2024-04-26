"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function CancelBooking(id: number) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("booking").delete().eq("id", id);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/student/my-bookings");

  return { message: "Success" };
}
