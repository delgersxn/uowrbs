"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function CreateBook({
  roomId,
  userId,
  startTime,
  finishTime,
  available,
  date,
}: any) {
  const supabase = createClient();

  //   const { data, error } = await supabase.from("room").insert([room]).select();

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
  console.log({ roomId, userId, startTime, finishTime, date });

  revalidatePath("/student/booking");

  return { message: "Success" };
}
