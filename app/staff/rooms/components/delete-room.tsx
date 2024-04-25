"use client";
import { useState } from "react";
import { DeleteRoom } from "../actions/delete-room";

export default function DeleteRoomButton({ room }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const confirmDelete = async () => {
    await DeleteRoom(room.id);
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="justify-center text-lg">
            Are you sure want to delete room{" "}
            <span className="badge badge-neutral">ID {room.id}</span> ?
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
