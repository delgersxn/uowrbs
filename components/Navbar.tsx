import AuthButton from "./AuthButton";
import logo from "./images/logo.png";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className="navbar justify-between sticky top-0 z-50 bg-base-100">
      <div className="flex">
        <button className="btn btn-ghost text-xl">
          {" "}
          <Image
            src={logo}
            className="fill-current"
            width="32"
            height="32"
            alt="uow-logo"
          />{" "}
          UOW Room Booking
        </button>
      </div>
      <AuthButton />
    </div>
  );
}
