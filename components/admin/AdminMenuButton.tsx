import Link from "next/link";

export default async function AdminMenuButton() {
  return (
    <div className="flex gap-2">
      <Link href="/admin/rooms" className="btn btn-sm">
        Room Management
      </Link>
      <Link href="/admin/users" className="btn btn-sm">
        User Management
      </Link>
    </div>
  );
}
