"use client";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { RetrieveSlots } from "../actions/retrieve-slots";
import { set } from "date-fns";
import { CreateBook } from "../actions/create-book";

interface TimeSlot {
  startTime: string;
  finishTime: string;
  available: boolean;
}

function TimePicker({
  pickedRoomId,
  pickedDate,
  pickedSlot,
  setPickedSlot,
  isOpen,
}: any) {
  const [slots, setSlots] = useState<TimeSlot[]>();
  useEffect(() => {
    const getSlots = async () => {
      const slots = await RetrieveSlots({
        roomid: pickedRoomId,
        date: pickedDate,
      });
      setSlots(slots);
    };
    getSlots();
    setPickedSlot(undefined);
  }, [pickedDate, isOpen]);

  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {slots?.map((slot) => (
        <input
          disabled={!slot.available}
          key={slot.startTime}
          type="button"
          value={`${slot.startTime} - ${slot.finishTime}`}
          className={`btn btn-outline ${
            pickedSlot === slot ? "btn-primary" : ""
          }`}
          onClick={() => {
            setPickedSlot(slot);
          }}
        />
      ))}
    </div>
  );
}

export default function BookRoomModal({ room, userId, userEmail }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickDate, setPickDate] = useState({
    startDate: dayjs(new Date()).format("YYYY-MM-DD").toString(),
    endDate: dayjs(new Date()).format("YYYY-MM-DD").toString(),
  });
  const [pickedSlot, setPickedSlot] = useState<TimeSlot>();

  const handleDateChange = (newValue: any) => {
    setPickDate(newValue);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const book = async () => {
    // await editRoom({ room: updateRoom });
    await CreateBook({
      roomId: room.id,
      userId: userId,
      startTime: pickedSlot?.startTime,
      finishTime: pickedSlot?.finishTime,
      available: pickedSlot?.available,
      date: pickDate.startDate,
      email: userEmail,
    });
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
              inputClassName={
                "input input-bordered input-neutral w-full text-base-content"
              }
              primaryColor={"indigo"}
              popoverDirection="down"
              useRange={false}
              asSingle={true}
              minDate={new Date()}
              maxDate={new Date(dayjs(new Date()).add(7, "day").toDate())}
              value={pickDate}
              onChange={handleDateChange}
              displayFormat={"YYYY-MM-DD"}
            />
          </div>
          <img
            width="auto"
            height="auto"
            className="w-full h-48 object-cover rounded-lg"
            src={room.image}
            alt="Room"
          />
          <div>
            <span className="label-text">Select booking time</span>
            <TimePicker
              isOpen={isOpen}
              pickedRoomId={room.id}
              pickedDate={pickDate.startDate}
              pickedSlot={pickedSlot}
              setPickedSlot={setPickedSlot}
              // onChange={handleSlotChange}
            />
          </div>
          <div
            className={`grid gap-2 ${
              pickedSlot ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <button className="btn" onClick={toggleModal}>
              Close
            </button>
            {pickedSlot && (
              <button className="btn btn-primary" onClick={book}>
                Book
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
