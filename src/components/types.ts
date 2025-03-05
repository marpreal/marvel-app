import { CharacterType } from "../types/global";

export interface CharacterCardProps {
  character?: CharacterType;
  toggleFavorite: (character: CharacterType) => void;
  favorites: CharacterType[];
  loading?: boolean;
}

export interface NavbarProps {
  favoritesCount: number;
  toggleShowFavorites: () => void;
  resetShowFavorites: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  resultsCount: number;
}
