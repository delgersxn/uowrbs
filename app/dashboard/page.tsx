import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

import EditRoomModal from "./componenets/EditRoomModal";

export default async function Dashboard() {
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
    return redirect("/booking");
  }

  const { data: rooms, error: roomsError } = await supabase
    .from("room")
    .select("*");

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Room name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Created on</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>{room.capacity}</td>
                <td>{room.created_at}</td>
                <td>
                  <EditRoomModal room={room} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
