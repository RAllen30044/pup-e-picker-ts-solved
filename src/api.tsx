export const baseUrl = "http://localhost:3000";
import { Dog } from "./types";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((res) => res.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dog),
    }).then((res) => res.json());
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  updateDog: (id: number, favorite: boolean) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        isFavorite: !favorite,
      }),
    }).then((res) => res.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
