// Add your own custom types in here

export type Dog={
      name: string;
      image: string;
      description: string;
      isFavorite: boolean;
      id:number;
}
export type Props={
      allDogs: Dog[];
}
export type ActiveComponent = "all-dogs"|"favorited-dogs"|"unfavorited-dogs"| "create-dog-form";