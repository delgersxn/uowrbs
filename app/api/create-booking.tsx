"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function createBooking({
  roomId,
  userId,
  startTime,
  finishTime,
  available,
  date,
  email,
}: any) {
  const supabase = createSupabaseServerClient();

  if (available) {
    const { data, error } = await supabase
      .from("booking")
      .insert([
        {
          booked_room: roomId,
          date: date,
          startTime: startTime,
          finishTime: finishTime,
          booked_by: userId,
          email: email,
        },
      ])
      .select();

    if (error) {
      console.error("Error updating data", error);
      return { message: "db Error" };
    }
  } else {
    return { message: "Slot not available" };
  }
  //   console.log({ roomId, userId, startTime, finishTime, date });

  revalidatePath("/student/booking");

  return { message: "Success" };
}
