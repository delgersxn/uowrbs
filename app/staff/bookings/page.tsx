import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

import Navbar from "@/components/Navbar";
import StaffButton from "../StaffButton";

export default async function StaffBookings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .select("is_staff")
    .eq("id", user.id)
    .single();

  if (!staff?.is_staff) {
    return redirect("/student/booking");
  }

  const { data: bookings, error: bookingsError } = await supabase
    .from("booking")
    .select("*")
    .order("id", { ascending: true });

  function truncateID(id: string) {
    return id.substring(0, 8);
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />

      <div className="overflow-x-auto flex flex-col justify-center w-4/5 relative">
        <div className="flex justify-center my-4 bg-base-300 p-2 rounded-xl">
          <StaffButton />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>Booked by</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked at</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking.id}>
                <td>{truncateID(booking.id)}...</td>
                <td>{booking.booked_room}</td>
                <td>{booking.booked_by_email}</td>
                <td>{booking.booking_date.date}</td>
                <td>
                  {booking.booking_date.startTime} -{" "}
                  {booking.booking_date.finishTime}
                </td>
                <td>
                  {dayjs(new Date(booking.booked_at)).format(
                    "YYYY/MM/DD HH:mm"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
