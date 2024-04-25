import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import CancelBookingButton from "./components/cancel-booking";

export default async function MyBookings() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings, error: bookingsError } = await supabase
    .from("booking")
    .select("id,booked_room,date,startTime,finishTime,booked_at")
    .eq("booked_by", user?.id)
    .order("id", { ascending: true });

  function truncateID(id: string) {
    return id.substring(0, 8);
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />

      <div className="w-4/5 flex flex-col items-center justify-center relative">
        <div className="flex justify-center my-4 bg-base-300 p-2 rounded-xl w-full">
          <div className="flex gap-2">
            <Link href="/student/booking" className="btn btn-sm">
              Room Booking
            </Link>
            <Link href="/student/mybookings" className="btn btn-sm">
              My Bookings
            </Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked at</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking.id}>
                <td>{truncateID(booking.id)}...</td>
                <td>
                  <div className="badge badge-neutral">
                    ID {booking.booked_room}
                  </div>
                </td>
                <td>{booking.date}</td>
                <td>
                  {booking.startTime} - {booking.finishTime}
                </td>
                <td>
                  {dayjs(new Date(booking.booked_at)).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </td>
                <td className="flex justify-end gap-2">
                  <CancelBookingButton booking={booking} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
