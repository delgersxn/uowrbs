"use server";
import { createClient } from "@/utils/supabase/server";

interface TimeSlot {
  startTime: string;
  finishTime: string;
  available: boolean;
}

interface BookedSlot {
  startTime: string;
  finishTime: string;
}

const slots: TimeSlot[] = [
  {
    startTime: "08:00",
    finishTime: "10:00",
    available: false,
  },
  {
    startTime: "10:00",
    finishTime: "12:00",
    available: false,
  },
  {
    startTime: "12:00",
    finishTime: "14:00",
    available: false,
  },
  {
    startTime: "14:00",
    finishTime: "16:00",
    available: false,
  },
  {
    startTime: "16:00",
    finishTime: "18:00",
    available: false,
  },
  {
    startTime: "18:00",
    finishTime: "20:00",
    available: false,
  },
];

function makeSlotsAvailable(slots: TimeSlot[], bookedSlots: BookedSlot[]) {
  slots.forEach((slot) => {
    // Assume slot is available initially
    slot.available = true;

    // Check if the slot overlaps with any booked slot
    for (const bookedSlot of bookedSlots) {
      if (
        (slot.startTime >= bookedSlot.startTime &&
          slot.startTime < bookedSlot.finishTime) ||
        (slot.finishTime > bookedSlot.startTime &&
          slot.finishTime <= bookedSlot.finishTime) ||
        (slot.startTime <= bookedSlot.startTime &&
          slot.finishTime >= bookedSlot.finishTime)
      ) {
        // If there's an overlap, mark the slot as unavailable
        slot.available = false;
        break;
      }
    }
  });

  return slots;
}

export async function RetrieveSlots({ roomid, date }: any) {
  const supabase = createClient();

  const { data: bookedSlots, error } = await supabase
    .from("booking")
    .select("startTime,finishTime")
    .eq("booked_room", roomid)
    .eq("date", date);

  if (error) {
    console.error("Error getting data", error);
    return slots;
  }

  if (bookedSlots) {
    return makeSlotsAvailable(slots, bookedSlots);
  }

  return slots;
}