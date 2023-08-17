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
  const [dogSelectionImage, setDogSelectionImage] = useState("");
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
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="dogDescribing"
        id="dogDescription"
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="dogSelection"
        onChange={(e) => {
          setDogSelectionImage(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
