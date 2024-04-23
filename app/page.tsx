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
            <p className="py-6">Please select your role to continue.</p>
            <div className="join grid grid-cols-2 w-1/3">
              <button className="join-item btn btn-outline">Student</button>
              <button className="join-item btn btn-outline">Staff</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
