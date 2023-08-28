import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
export class ClassCreateDogForm extends Component<{
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}> {
  state = {
    nameInput: "",
    descriptionInput: "",
    dogSelectionImage: "",
  };
  render() {
    const { createDog, isLoading } = this.props;
    const { nameInput, descriptionInput, dogSelectionImage } = this.state;
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
          this.setState({ nameInput: "" });
          this.setState({ descriptionInput: "" });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          id="name"
          type="text"
          disabled={isLoading}
          value={nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
          autoComplete="on"
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="dogDescribing"
          id="description"
          cols={80}
          rows={10}
          disabled={isLoading}
          value={descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            this.setState({ dogSelectionImage: e.target.value });
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
        <input type="submit" disabled={isLoading} />
      </form>
    );
  }
}
