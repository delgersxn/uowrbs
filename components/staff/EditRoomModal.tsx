"use client";
import { useState, ChangeEvent } from "react";
import { editRoom } from "../../app/staff/rooms/actions/edit-room";

export default function EditRoomModal({ room }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateRoom, setUpdateRoom] = useState(room);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setUpdateRoom({
      ...updateRoom,
      [inputName]: event.target.value,
    });
  };

  const isAnyValueChanged = Object.keys(updateRoom).some(
    (inputName) => updateRoom[inputName] !== room[inputName]
  );

  const save = async () => {
    await editRoom({ room: updateRoom });

    toggleModal();
  };

  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={toggleModal}>
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </button>
      <dialog className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Edit room <span className="badge badge-neutral">ID{room.id}</span>
          </h3>
          <form className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              required
              type="text"
              defaultValue={updateRoom.name}
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "name")}
            />
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              required
              type="text"
              placeholder="Type here"
              defaultValue={updateRoom.location}
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "location")}
            />
            <div className="label">
              <span className="label-text">Capacity</span>
            </div>
            <input
              required
              type="number"
              placeholder="Type here"
              defaultValue={updateRoom.capacity}
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "capacity")}
            />
            <div className="label">
              <span className="label-text">Room Photo URL</span>
            </div>
            <input
              required
              type="text"
              placeholder="Type here"
              defaultValue={updateRoom.image}
              className="input input-bordered w-full "
              onChange={(e) => handleChange(e, "image")}
            />

            {isAnyValueChanged ? (
              <button className="btn btn-primary mt-4" formAction={save}>
                Save
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
