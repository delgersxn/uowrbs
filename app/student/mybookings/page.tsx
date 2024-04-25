import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

export default async function MyBookings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: staff, error } = await supabase
    .from("staff")
    .select("is_staff")
    .eq("id", user.id)
    .single();

  if (staff?.is_staff) {
    return redirect("/staff/rooms");
  }

  const { data: bookings, error: bookingsError } = await supabase
    .from("booking")
    .select("*")
    .eq("booked_by", user.id)
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
                <td>{booking.booked_room}</td>
                <td>{booking.date}</td>
                <td>
                  {booking.startTime} - {booking.finishTime}
                </td>
                <td>
                  {dayjs(new Date(booking.booked_at)).format(
                    "YYYY-MM-DD HH:mm"
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
