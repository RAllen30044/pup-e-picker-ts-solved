// you can use this type for react children if you so choose

import { Link } from "react-router-dom";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { Dog } from "../types";

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
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector active`} onClick={() => {}}>
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector`} onClick={() => {}}>
            unfavorited ( 25 )
          </div>
          <div className={`selector`} onClick={() => {}}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        <FunctionalDogs
          allDogs={allDogs}
          isLoading={isLoading}
          deleteDog={deleteDog}
          updateDog={updateDog}
        />
        <FunctionalCreateDogForm createDog={createDog} isLoading={isLoading} />
      </div>
    </section>
  );
};
