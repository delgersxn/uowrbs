import Link from "next/link";

export default async function StaffButton() {
  return (
    <div>
      <Link href="/staff/rooms" className="btn btn-sm">
        Rooms
      </Link>
      <Link href="/staff/bookings" className="btn btn-sm">
        Bookings
      </Link>
    </div>
  );
}
