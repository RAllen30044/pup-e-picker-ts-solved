import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { useState } from "react";
// use this as your default selected image

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dogSelectionImage, setDogSelectionImage] = useState(dogPictures.BlueHeeler);
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: nameInput,
          description: descriptionInput,
          image: dogSelectionImage,
          isFavorite: false,
        });
        setDescriptionInput("");
        setNameInput("");
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        id="name"
        type="text"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        autoComplete="on"
        required
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="dogDescribing"
        id="description"
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        required
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        onChange={(e) => {
          setDogSelectionImage(e.target.value);
        }}
        required
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
