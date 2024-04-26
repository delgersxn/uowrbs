"use client";
import { useState, ChangeEvent } from "react";
import { createRoom } from "../../app/staff/rooms/actions/create-room";

interface Room {
  name?: string;
  location?: string;
  capacity?: number;
  image?: string;
}

const initialRoom = { name: "", location: "", capacity: 0, image: "" };

export default function CreateRoomModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoom, setNewRoom] = useState<Room>(initialRoom);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setNewRoom({
      ...newRoom,
      [inputName]: event.target.value,
    });
  };

  const isAnyValueChanged = Object.keys(newRoom).some(
    (inputName) => newRoom[inputName as keyof Room] != ""
  );

  const save = async () => {
    await createRoom({ room: newRoom });
    setNewRoom(initialRoom);
    toggleModal();
    // console.log(newRoom);
  };

  return (
    <>
      <button
        className="btn btn-neutral btn-sm absolute right-2"
        onClick={toggleModal}
      >
        Create Room
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Room</h3>
          <form className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              value={newRoom?.name}
              required={isAnyValueChanged}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "name")}
            />
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              value={newRoom?.location}
              required={isAnyValueChanged}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "location")}
            />
            <div className="label">
              <span className="label-text">Capacity</span>
            </div>
            <input
              value={newRoom?.capacity}
              required={isAnyValueChanged}
              type="number"
              placeholder="Type number here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "capacity")}
            />
            <div className="label">
              <span className="label-text">Room Photo URL</span>
            </div>
            <input
              value={newRoom?.image}
              required={isAnyValueChanged}
              type="text"
              placeholder="Type URL here"
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "image")}
            />

            {isAnyValueChanged ? (
              <button className="btn btn-primary mt-4" formAction={save}>
                Create
              </button>
            ) : (
              <button className="btn mt-4" onClick={toggleModal}>
                Close
              </button>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
}
