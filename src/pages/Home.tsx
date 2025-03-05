import { useEffect, useState } from "react";
import api from "../api/marvelApi";
import { HomeState, HomeActions } from "./types";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useMarvelStore } from "../store/useMarvelStore";
import "../styles/Home.css";
import noResultsImage from "../assets/no-results.jpg";

function Home() {
  const [state, setState] = useState<HomeState>({
    characters: [],
    loading: true,
    search: "",
    showFavorites: false,
  });

  const [error, setError] = useState<boolean>(false);

  const { favorites, addFavorite, removeFavorite } = useMarvelStore();

  useEffect(() => {
    api.get("/characters?limit=50")
      .then((response) => {
        const characters = response.data.data.results;

        setState((prev) => ({
          ...prev,
          characters,
          loading: false,
        }));

        if (characters.length === 0) {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
        setState((prev) => ({ ...prev, characters: [], loading: false }));
      });
  }, []);

  const handleSearch: HomeActions["handleSearch"] = (query) =>
    setState((prev) => ({ ...prev, search: query }));

  const toggleFavorite: HomeActions["toggleFavorite"] = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const toggleShowFavorites: HomeActions["toggleShowFavorites"] = () =>
    setState((prev) => ({ ...prev, showFavorites: !prev.showFavorites }));

  const resetShowFavorites: HomeActions["resetShowFavorites"] = () =>
    setState((prev) => ({ ...prev, showFavorites: false }));

  const displayedCharacters = state.showFavorites
    ? favorites
    : state.characters.filter((char) =>
        char.name.toLowerCase().includes(state.search.toLowerCase())
      );

  return (
    <>
      <Navbar
        favoritesCount={favorites.length}
        toggleShowFavorites={toggleShowFavorites}
        resetShowFavorites={resetShowFavorites}
      />

      <div className="home-container">
        <SearchBar onSearch={handleSearch} resultsCount={displayedCharacters.length} />

        {state.loading ? (
          <div className="character-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <CharacterCard key={index} loading={true} toggleFavorite={toggleFavorite} favorites={favorites} />
            ))}
          </div>
        ) : error || displayedCharacters.length === 0 ? (
          <div className="no-results">
            <img src={noResultsImage} alt="No results found" />
            <p className="error-message">No results found. There are an API error, try later.</p>
          </div>
        ) : (
          <div className="character-grid">
            {displayedCharacters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                loading={false}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
