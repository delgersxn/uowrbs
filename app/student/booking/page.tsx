import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import Link from "next/link";

import BookRoomModal from "./components/book-room";

export default async function MyBookings() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rooms, error: roomsError } = await supabase
    .from("room")
    .select("*")
    .order("id", { ascending: true });

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
        <div className="gap-4 grid grid-cols-4 w-full">
          {rooms?.map((room) => (
            <div className="card bg-base-100 shadow-xl" key={room.id}>
              <figure className="">
                <img
                  width="auto"
                  height="auto"
                  className="w-full h-36 object-cover"
                  src={room.image}
                  alt="Room"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">{room.name}</h2>
                <p className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                  </svg>
                  {room.location}
                </p>
                <div className="badge badge-neutral absolute left-2 top-2">
                  ID {room.id}
                </div>
                <div className="card-actions justify-between">
                  <p className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-armchair"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" />
                      <path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" />
                      <path d="M6 19v2" />
                      <path d="M18 19v2" />
                    </svg>
                    {room.capacity}
                  </p>
                  <BookRoomModal
                    room={room}
                    userId={user?.id}
                    userEmail={user?.email}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
