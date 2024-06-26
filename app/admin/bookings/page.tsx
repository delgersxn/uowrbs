import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import dayjs from "dayjs";
import Navbar from "@/components/Navbar";
import StaffMenuButton from "@/components/staff/StaffMenuButton";
import CancelBookingButton from "@/components/staff/CancelBookingButton";

export default async function StaffBookings() {
  const supabase = createSupabaseServerClient();

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
          <StaffMenuButton />
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
                <td>
                  <div className="badge badge-neutral">
                    ID {booking.booked_room}
                  </div>
                </td>
                <td>{booking.email}</td>
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
