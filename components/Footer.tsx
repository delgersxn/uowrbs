import logo from "./images/Logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <aside>
        <Image
          src={logo}
          className="fill-current"
          width="50"
          height="50"
          alt="logo"
        />
        <p>
          UOW Room Booking
          <br />
          CSIT214 Project - 2024 Semester 2
        </p>
      </aside>
    </footer>
  );
}
