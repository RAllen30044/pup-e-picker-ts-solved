import { useEffect, useState } from "react";

import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => {
        fetchData();
      })
      .then(() => {
        toast.success("You have posted a new dog");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    Requests.delete(id)
      .then(() => {
        fetchData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateDog = (id: number, favorite: boolean) => {
    setIsLoading(true);
    Requests.updateDog(id, favorite)
      .then(() => {
        fetchData();
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        isLoading={isLoading}
        deleteDog={deleteDog}
        updateDog={updateDog}
        createDog={createDog}
      />
    </div>
  );
}
