"use client";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

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

function TimePicker({ pickedDate }: any) {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {timeSlots.map((slot) => (
        <input
          key={slot.startTime}
          type="radio"
          name="time"
          aria-label={`${slot.startTime} - ${slot.finishTime}`}
          className="btn btn-outline"
        />
      ))}
    </div>
  );
}

export default function BookRoomModal({ room, userId }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickDate, setPickDate] = useState({
    startDate: dayjs(new Date()).format("YYYY-MM-DD").toString(),
    endDate: dayjs(new Date()).format("YYYY-MM-DD").toString(),
  });

  //   console.log(dayjs(new Date()).format("YYYY/MM/DD").toString());

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setPickDate(newValue);
  };

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
        <div className="modal-box h-auto flex flex-col gap-4">
          <h1 className="font-bold text-lg">Book {room.name}</h1>
          <div className="">
            <span className="label-text">Select booking date</span>
            <Datepicker
              primaryColor={"indigo"}
              popoverDirection="down"
              useRange={false}
              asSingle={true}
              minDate={new Date()}
              maxDate={new Date(dayjs(new Date()).add(7, "day").toDate())}
              value={pickDate}
              onChange={handleValueChange}
              displayFormat={"YYYY/MM/DD"}
            />
          </div>
          <img
            className="w-full h-48 object-cover rounded-lg"
            src={room.image}
            alt="Room"
          />
          <div>
            <span className="label-text">Select booking time</span>
            <TimePicker pickedDate={pickDate.startDate} />
          </div>
          <button className="btn" onClick={toggleModal}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
