"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

// TODO Make sure only staff can cancel other id's booking
export async function cancelBooking(id: number) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("booking").delete().eq("id", id);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/bookings");

  return { message: "Success" };
}
