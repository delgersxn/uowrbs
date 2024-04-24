import Link from "next/link";

export default async function StaffButton() {
  return (
    <div className="flex gap-2">
      <Link href="/staff/rooms" className="btn btn-sm">
        Rooms
      </Link>
      <Link href="/staff/bookings" className="btn btn-sm">
        Bookings
      </Link>
    </div>
  );
}
