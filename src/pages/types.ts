import { CharacterType, Comic } from "../types/global";

export interface HomeState {
  characters: CharacterType[];
  loading: boolean;
  search: string;
  showFavorites: boolean;
}

export interface HomeActions {
  handleSearch: (query: string) => void;
  toggleFavorite: (character: CharacterType) => void;
  toggleShowFavorites: () => void;
  resetShowFavorites: () => void;
}

export interface CharacterState {
  character: CharacterType | null;
  comics: Comic[];
  loading: boolean;
}

export interface CharacterActions {
  toggleFavorite: () => void;
}

export interface FavoritesState {
  favorites: CharacterType[];
}
