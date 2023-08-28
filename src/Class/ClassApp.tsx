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
    this.setState({ isLoading: true });
    this.fetchData().then(() => this.setState({ isLoading: false }));
  }
  createDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(() => {
        this.fetchData();
      }).then(()=>{
        toast.success("Dog Created")
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.delete(id)
      .then(() => {
        this.fetchData();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  updateDog = (id: number, favorite: boolean) => {
    this.setState({ isLoading: true });
    Requests.updateDog(id, favorite)
      .then(() => {
        this.fetchData();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { updateDog, createDog, deleteDog } = this;
    const {allDogs, isLoading}= this.state;
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
