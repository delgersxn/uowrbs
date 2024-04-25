"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function editRoom({ room }: any) {
  const supabase = createSupabaseServerClient();
  const { id: roomId, name, location, capacity, image } = room;
  const { data, error } = await supabase
    .from("room")
    .update({
      name,
      location,
      capacity,
      image,
    })
    .eq("id", roomId);

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/staff/rooms");

  return { message: "Success" };
}
