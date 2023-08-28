import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  isLoading: boolean;
  allDogs: Dog[];
  deleteDog: (id: number) => void;
  updateDog: (id: number, favorite: boolean) => void;
}> {
  render() {
    const { allDogs, isLoading, deleteDog, updateDog } = this.props;
    return (
      <>
        {allDogs.map((dog) => {
          return (
            <DogCard
              dog={{
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
                id: dog.id,
              }}
              key={dog.id}
              onTrashIconClick={() => {
                deleteDog(dog.id);
              }}
              onHeartClick={() => {
                updateDog(dog.id, dog.isFavorite);
              }}
              onEmptyHeartClick={() => {
                updateDog(dog.id, dog.isFavorite);
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
