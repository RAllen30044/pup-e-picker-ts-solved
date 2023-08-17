import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  allDogs: Dog[];
  isLoading: boolean;
  deleteDog: (id: number) => void;
  updateDog: (id: number, favorite: boolean) => void;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
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
                updateDog(dog.id, dog.isFavorite)
              }}
              onEmptyHeartClick={() => {
                updateDog(dog.id,dog.isFavorite)
              }}
              isLoading={isLoading}
            />
          );
        })}
     
    </>
  );
};
