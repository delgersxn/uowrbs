import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import dayjs from "dayjs";
import Navbar from "@/components/Navbar";
import AdminMenuButton from "@/components/admin/AdminMenuButton";
import ApproveRoomButton from "@/components/admin/ApproveRoomButton";
import RefuseRoomButton from "@/components/admin/RefuseRoomButton";

export default async function StaffRooms() {
  const supabase = createSupabaseServerClient();

  const { data: rooms, error: roomsError } = await supabase
    .from("room")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />

      <div className="overflow-x-auto flex flex-col justify-center w-4/5 relative">
        <div className="flex justify-center my-4 bg-base-300 p-2 rounded-xl">
          <AdminMenuButton />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Room name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created on</th>
              <th>Created by</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.id}>
                <td>
                  <div className="badge badge-neutral">ID{room.id}</div>
                </td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>{room.capacity}</td>
                <td>${room.price}</td>
                <td>{room.approved ? "Approved" : "Pending"}</td>
                <td>
                  {dayjs(new Date(room.created_at)).format("YYYY/MM/DD HH:mm")}
                </td>
                <td>tchew@uow.edu.au</td>
                <td>
                  {room.approved ? (
                    // delete btn?
                    <></>
                  ) : (
                    <div className="flex  justify-end gap-2">
                      <RefuseRoomButton room={room} />
                      <ApproveRoomButton room={room} />
                    </div>
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
