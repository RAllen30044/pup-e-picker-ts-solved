// you can use this type for react children if you so choose

import { Link } from "react-router-dom";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { ActiveComponent, Dog } from "../types";
import { useState } from "react";

export const FunctionalSection = ({
  createDog,
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
  allDogs: Dog[];
  deleteDog: (id: number) => void;
  updateDog: (id: number, favorite: boolean) => void;
}) => {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("all-dogs");

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite === true);
  const unfavoriteDogs = allDogs.filter((dog) => dog.isFavorite === false);

  const toggleTab = (input: ActiveComponent) => {
    if (input === "all-dogs") {
      setActiveComponent("all-dogs");
      return;
    }
    if (input === activeComponent) {
      setActiveComponent("all-dogs");
      return;
    }
    if (input !== activeComponent) {
      setActiveComponent(input);
      return;
    }
  };
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeComponent === "favorited-dogs" ? "active" : ""
            }`}
            onClick={() => {
              toggleTab("favorited-dogs");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeComponent === "unfavorited-dogs" ? "active" : ""
            }`}
            onClick={() => {
              toggleTab("unfavorited-dogs");
            }}
          >
            unfavorited ( {unfavoriteDogs.length} )
          </div>
          <div
            className={`selector ${
              activeComponent === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              toggleTab("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeComponent === "all-dogs" && (
          <FunctionalDogs
            allDogs={allDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {activeComponent === "favorited-dogs" && (
          <FunctionalDogs
            allDogs={favoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {activeComponent === "unfavorited-dogs" && (
          <FunctionalDogs
            allDogs={unfavoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}

        {activeComponent === "create-dog-form" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
};
