/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Topbar from "../components/Topbar";
import { setPreferences } from "../api/dataAPI";
import Swal from "sweetalert2";

const SetPreferences = () => {
  const availableTags = [
    "Action",
    "Adventure",
    "Casual",
    "Indie",
    "Massively Multiplayer",
    "Multiplayer",
    "Puzzle",
    "Racing",
    "RPG",
    "Simulation",
    "Sports",
    "Strategy",
    "Survival",
    "VR",
    "War",
    "Zombies",
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remainingTags, setRemainingTags] = useState<string[]>(availableTags);

  const handleSelectTags = (event: { target: { value: unknown } }) => {
    const selectedValues = event.target.value as string;
    setSelectedTags([...selectedTags, selectedValues]);
    setRemainingTags(remainingTags.filter((tag) => tag !== selectedValues));
  };

  const handleSubmit = async () => {
    const response = await setPreferences(selectedTags.toString());

    console.log(response)

    Swal.fire({
      title: "Preferences Set Successfully",
      icon: "success",
      confirmButtonText: "Okay",

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };
  return (
    <>
      <div className="bg-[#171d25] h-screen ">
        <img
          src="/login-background.jpeg"
          className="w-full h-full absolute object-cover opacity-50 "
        />
        <Topbar />

        <div className="absolute  top-[35%] left-[35%]">
          <h1 className="text-white opacity-90 text-3xl font-extrabold tracking-widest my-2">
            Set Preferences
          </h1>
          <div className=" bg-[#171d25] p-10 rounded-xl shadow-2xl">
            <div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tags"
                  className="text-blue-600 text-sm font-bold tracking-wider uppercase"
                >
                  Choose Tags
                </label>
                <p>
                  {selectedTags.map((tag) => (
                    <div className="text-blue-600">#{tag}</div>
                  ))}
                </p>
                <select
                  value={selectedTags}
                  id="tags"
                  onChange={handleSelectTags}
                  className="h-12 rounded-xl px-10"
                >
                  <option value="">-- Select a tag -- </option>
                  {remainingTags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 h-12 mt-12 text-white text-xl tracking-widest"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPreferences;
