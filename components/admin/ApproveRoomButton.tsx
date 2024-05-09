"use client";
import { useState } from "react";
import { approveRoom } from "@/app/api/approve-room";

export default function ApproveRoomButton({ room }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const confirmApprove = async () => {
    await approveRoom(room.id);
    toggleModal();
  };

  return (
    <>
      <button
        className="btn btn-success btn-outline btn-sm"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-check"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="justify-center text-lg">
            Are you sure want to approve room{" "}
            <span className="badge badge-neutral">ID {room.id}</span> ?
          </h3>
          <div className="flex gap-2 justify-end mt-4">
            <button className="btn btn-primary " onClick={confirmApprove}>
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
