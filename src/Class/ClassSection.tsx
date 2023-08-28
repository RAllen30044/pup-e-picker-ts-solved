// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, Props } from "../types";

export class ClassSection extends Component<{
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
  allDogs: Dog[];
  deleteDog: (id: number) => void;
  updateDog: (id: number, favorite: boolean) => void;
}> {
  state = {
    favoriteDogs: [],
    unfavoriteDogs: [],
    showComponent: "all-dogs",
    activeOne: "",
    activeTwo: "",
    activeThree: "",
  };

  componentDidMount() {
    this.updateDogList();
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.allDogs !== this.props.allDogs) {
      this.updateDogList();
    }
  }

  updateDogList = () => {
    const favorited: Dog[] = [];
    const unfavorited: Dog[] = [];

    this.props.allDogs.map((dog) => {
      if (dog.isFavorite === true) {
        favorited.push(dog);
      } else {
        unfavorited.push(dog);
      }
    });

    this.setState({ favoriteDogs: favorited });
    this.setState({ unfavoriteDogs: unfavorited });
  };

  render() {
    const { allDogs, isLoading, createDog, deleteDog, updateDog } = this.props;
    const {
      favoriteDogs,
      unfavoriteDogs,
      showComponent,
      activeOne,
      activeTwo,
      activeThree,
    } = this.state;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${activeOne}`}
              onClick={() => {
                if (activeOne === "active") {
                  this.setState({ activeOne: "" });
                  return this.setState({ showComponent: "all-dogs" });
                }
                this.setState({ activeOne: "active" });
                this.setState({ activeTwo: "" });
                this.setState({ activeThree: "" });
                this.setState({ showComponent: "favorited-dogs" });
              }}
            >
              favorited ( {favoriteDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${activeTwo}`}
              onClick={() => {
                if (activeTwo === "active") {
                  this.setState({ activeTwo: "" });
                  return this.setState({ showComponent: "all-dogs" });
                }
                this.setState({ activeOne: "" });
                this.setState({ activeTwo: "active" });
                this.setState({ activeThree: "" });
                this.setState({ showComponent: "unfavorited-dogs" });
              }}
            >
              unfavorited ( {unfavoriteDogs.length} )
            </div>
            <div
              className={`selector ${activeThree}`}
              onClick={() => {
                if (activeThree === "active") {
                  this.setState({ activeThree: "" });
                  return this.setState({ showComponent: "all-dogs" });
                }
                this.setState({ activeOne: "" });
                this.setState({ activeTwo: "" });
                this.setState({ activeThree: "active" });
                this.setState({ showComponent: "dog-form" });
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {showComponent === "all-dogs" && (
            <ClassDogs
              allDogs={allDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}
          {showComponent === "favorited-dogs" && (
            <ClassDogs
              allDogs={favoriteDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}
          {showComponent === "unfavorited-dogs" && (
            <ClassDogs
              allDogs={unfavoriteDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}

          {showComponent === "dog-form" && (
            <ClassCreateDogForm createDog={createDog} isLoading={isLoading} />
          )}
        </div>
      </section>
    );
  }
}
