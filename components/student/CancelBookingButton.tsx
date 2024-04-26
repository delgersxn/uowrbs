"use client";
import { useState } from "react";
import { CancelBooking } from "../../app/student/my-bookings/actions/cancel-booking";

export default function CancelBookingButton({ booking }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const confirmDelete = async () => {
    await CancelBooking(booking.id);
    toggleModal();
  };

  function truncateID(id: string) {
    return id.substring(0, 8);
  }

  return (
    <>
      <button
        className="btn btn-error btn-outline btn-sm"
        onClick={toggleModal}
      >
        Cancel
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="justify-center text-lg">
            Are you sure want to cancel booking{" "}
            <span className="badge badge-neutral">
              ID {truncateID(booking.id)}
            </span>{" "}
            ?
          </h3>
          <div className="flex gap-2 justify-end mt-4">
            <button className="btn btn-error " onClick={confirmDelete}>
              Yes
            </button>
            <button className="btn" onClick={toggleModal}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
