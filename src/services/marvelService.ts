import { useQuery } from "@tanstack/react-query";
import api from "../api/marvelApi";
import { CharacterType, Comic } from "../types/global";

const fetchCharacters = async (): Promise<CharacterType[]> => {
  const response = await api.get("/characters?limit=50");
  return response.data.data.results;
};

const fetchCharacter = async (id: string): Promise<CharacterType> => {
  const response = await api.get(`/characters/${id}`);
  return response.data.data.results[0];
};

const fetchCharacterComics = async (id: string): Promise<Comic[]> => {
  const response = await api.get(
    `/characters/${id}/comics?limit=20&orderBy=onsaleDate`
  );
  return response.data.data.results;
};

export const useCharacters = () => {
  return useQuery<CharacterType[], Error>({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useCharacter = (id?: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => (id ? fetchCharacter(id) : Promise.reject("No ID provided")),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useCharacterComics = (id?: string) => {
  return useQuery({
    queryKey: ["comics", id],
    queryFn: () =>
      id ? fetchCharacterComics(id) : Promise.reject("No ID provided"),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
