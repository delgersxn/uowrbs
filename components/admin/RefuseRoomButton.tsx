"use client";
import { useState } from "react";
import { deleteRoom } from "@/app/api/delete-room";

export default function RefuseRoomButton({ room }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const refuseApprove = async () => {
    await deleteRoom(room.id);
    toggleModal();
  };

  return (
    <>
      <button
        className="btn btn-error btn-outline btn-sm"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="justify-center text-lg">
            Are you sure want to refuse room{" "}
            <span className="badge badge-neutral">ID {room.id}</span> ?
          </h3>
          <div className="flex gap-2 justify-end mt-4">
            <button className="btn btn-error " onClick={refuseApprove}>
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
