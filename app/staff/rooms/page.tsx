import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

import Navbar from "@/components/Navbar";
import EditRoomModal from "./components/edit-room";
import CreateRoomModal from "./components/create-room";
import DeleteRoomButton from "./components/delete-room";
import StaffButton from "../StaffButton";

export default async function StaffRooms() {
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

  const { data: rooms, error: roomsError } = await supabase
    .from("room")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />

      <div className="overflow-x-auto flex flex-col justify-center w-4/5 relative">
        <div className="flex justify-center my-4 bg-base-300 p-2 rounded-xl">
          <StaffButton />
          <CreateRoomModal />
        </div>
        <table className="table">
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
                <td>
                  <div className="badge badge-neutral">ID {room.id}</div>
                </td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>{room.capacity}</td>
                <td>
                  {dayjs(new Date(room.created_at)).format("YYYY/MM/DD HH:mm")}
                </td>
                <td className="flex  justify-end gap-2">
                  <EditRoomModal room={room} />
                  <DeleteRoomButton room={room} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
