import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useMarvelStore } from "../store/useMarvelStore";
import heartDefault from "../assets/state-default.png";
import heartUnselected from "../assets/state-unselected.png";
import noResultsImage from "../assets/no-results.jpg";
import "../styles/Character.css";
import { useCharacterComics, useCharacter } from "../services/marvelService";
import { SkeletonCharacter } from "../components/SkeletonCharacter";
import { useTranslation } from "react-i18next";

function Character() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { favorites, addFavorite, removeFavorite } = useMarvelStore();

  const {
    data: character,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useCharacter(id);
  const { data: comics, isLoading: isComicsLoading } = useCharacterComics(id);

  if (isCharacterLoading || isComicsLoading) return <SkeletonCharacter />;

  const noCharacter = isCharacterError || !character;

  return (
    <div className="character-page">
      <Navbar
        favoritesCount={favorites.length}
        toggleShowFavorites={() => {}}
        resetShowFavorites={() => {}}
      />

      <div className="character-header">
        <div className="character-content">
          <div className="character-image-container">
            {noCharacter ? (
              <img
                src={noResultsImage}
                alt="No character found"
                className="character-image"
              />
            ) : (
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
            )}
          </div>

          <div className="character-info">
            <div className="character-title">
              <h1>
                {noCharacter
                  ? "No character found"
                  : character.name.toUpperCase()}
              </h1>
              {!noCharacter && (
                <button
                  className="favorite-button-character"
                  onClick={() => {
                    const isFavorite = favorites.some(
                      (fav) => fav.id === character.id
                    );
                    if (isFavorite) {
                      removeFavorite(character.id);
                    } else {
                      addFavorite(character);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.some((fav) => fav.id === character?.id)
                        ? heartDefault
                        : heartUnselected
                    }
                    alt="Favorite Icon"
                  />
                </button>
              )}
            </div>
            <div className="character-description">
              <p>
                {noCharacter
                  ? t("character.tryLater")
                  : character.description ||
                    t("character.descriptionComingSoon")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!noCharacter && (
        <section className="comics-section">
          {comics && comics.length > 0 && <h2>{t("character.comics")}</h2>}
          <div className="comics-list">
            {comics && comics.length > 0 ? (
              comics.map((comic) => (
                <div key={comic.id} className="comic-card">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className="comic-image"
                  />
                  <div className="comic-info">
                    <p className="comic-title">{comic.title}</p>
                    <p className="comic-year">
                      {new Date(
                        comic.dates.find((d) => d.type === "onsaleDate")
                          ?.date || ""
                      ).getFullYear() || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>{t("character.noComics")}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Character;
