import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import Navbar from "@/components/Navbar";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />

      <div className="hero h-[calc(100vh-4rem)] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://www.uow.edu.au/assets/contributed/library/180430_MPA_UOWLibrary_0081-750x421.jpg"
            width={480}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Welcome to
              <br></br>
              <span className="text-primary">UOW Room Booking</span>
            </h1>
            <p className="pt-2 pb-6">
              School room booking system made easier for students!
            </p>
            <HomeButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
