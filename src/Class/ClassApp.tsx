import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export class ClassApp extends Component {
  state = {
    allDogs: [],
    isLoading: false,
  };
  fetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((data) => this.setState({ allDogs: data }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  componentDidMount(): void {
    this.fetchData();
  }
  createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog)
      .then(() => {
        this.fetchData();
      })
      .then(() => {
        toast.success("Dog Created");
      });
  };

  deleteDog = (id: number) => {
    Requests.delete(id).then(() => {
      this.fetchData();
    });
  };

  updateDog = (id: number, favorite: boolean) => {
    Requests.updateDog(id, favorite).then(() => {
      this.fetchData();
    });
  };

  render() {
    const { updateDog, createDog, deleteDog } = this;
    const { allDogs, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          updateDog={updateDog}
          createDog={createDog}
          deleteDog={deleteDog}
          allDogs={allDogs}
          isLoading={isLoading}
        />

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
