"use client";
import { useState } from "react";

const timeSlots = [
  {
    startTime: "08:00",
    finishTime: "10:00",
  },
  {
    startTime: "10:00",
    finishTime: "12:00",
  },
  {
    startTime: "12:00",
    finishTime: "14:00",
  },
  {
    startTime: "14:00",
    finishTime: "16:00",
  },
  {
    startTime: "16:00",
    finishTime: "18:00",
  },
  {
    startTime: "18:00",
    finishTime: "20:00",
  },
];

function TimePicker() {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {timeSlots.map((slot) => (
        <input
          type="radio"
          name="time"
          aria-label={`${slot.startTime} - ${slot.finishTime}`}
          className="btn btn-outline"
        />
      ))}
    </div>
  );
}

export default function BookRoomModal({ roomName, roomId, userId }: any) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(roomName, roomId, userId);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const save = async () => {
    // await editRoom({ room: updateRoom });
    toggleModal();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={toggleModal}>
        Book
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h1 className="font-bold text-lg">Book {roomName}</h1>
          <TimePicker />
          <button className="btn mt-4" onClick={toggleModal}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
