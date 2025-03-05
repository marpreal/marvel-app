import { create } from "zustand";
import { CharacterType } from "../types/global";

interface MarvelState {
  favorites: CharacterType[];
  addFavorite: (character: CharacterType) => void;
  removeFavorite: (id: number) => void;
}

export const useMarvelStore = create<MarvelState>((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),

  addFavorite: (character) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, character];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
}));
