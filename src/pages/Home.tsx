import "../styles/Home.css";
import { CharacterType } from "../types/global";
import { HomeActions } from "./types";
import { useCharacters } from "../services/marvelService";
import { useMarvelStore } from "../store/useMarvelStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CharacterCard from "../components/CharacterCard";
import Navbar from "../components/Navbar";
import noResultsImage from "../assets/no-results.jpg";
import SearchBar from "../components/SearchBar";

function Home() {
  const { t } = useTranslation();
  const { data: characters = [], isLoading, isError } = useCharacters();
  const [search, setSearch] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { favorites, addFavorite, removeFavorite } = useMarvelStore();

  const handleSearch: HomeActions["handleSearch"] = (query) => setSearch(query);

  const toggleFavorite: HomeActions["toggleFavorite"] = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const toggleShowFavorites: HomeActions["toggleShowFavorites"] = () =>
    setShowFavorites((prev) => !prev);

  const resetShowFavorites: HomeActions["resetShowFavorites"] = () =>
    setShowFavorites(false);

  const displayedCharacters = showFavorites
    ? favorites
    : characters.filter((char: CharacterType) =>
        char.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <Navbar
        favoritesCount={favorites.length}
        toggleShowFavorites={toggleShowFavorites}
        resetShowFavorites={resetShowFavorites}
      />

      <div className="home-container">
        <SearchBar
          onSearch={handleSearch}
          resultsCount={displayedCharacters.length}
        />

        {isLoading ? (
          <div className="character-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <CharacterCard
                key={index}
                loading={true}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            ))}
          </div>
        ) : isError || displayedCharacters.length === 0 ? (
          <div className="no-results">
            <img src={noResultsImage} alt={t("home.noResults")} />
            <p className="error-message">{t("home.noResults")}</p>
          </div>
        ) : (
          <div className="character-grid">
            {displayedCharacters.map((char: CharacterType) => (
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
