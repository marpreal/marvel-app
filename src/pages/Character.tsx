import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/marvelApi";
import { CharacterState } from "./types";
import Navbar from "../components/Navbar";
import { useMarvelStore } from "../store/useMarvelStore";
import heartDefault from "../assets/state-default.png";
import heartUnselected from "../assets/state-unselected.png";
import noResultsImage from "../assets/no-results.jpg";
import "../styles/Character.css";

const SkeletonCharacter = () => (
  <div className="character-page">
    <Navbar
      favoritesCount={0}
      toggleShowFavorites={() => {}}
      resetShowFavorites={() => {}}
    />

    <div className="character-header skeleton">
      <div className="character-content">
        <div className="character-image-container skeleton-image"></div>

        <div className="character-info">
          <div className="character-title">
            <span className="skeleton-text skeleton-title"></span>
            <div className="skeleton-button"></div>
          </div>
          <span className="skeleton-text skeleton-description"></span>
          <span className="skeleton-text skeleton-description short"></span>
        </div>
      </div>
    </div>

    <section className="comics-section">
      <h2 className="skeleton-text skeleton-title"></h2>
      <div className="comics-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="comic-card skeleton">
            <div className="comic-image skeleton-image"></div>
            <div className="comic-info">
              <span className="skeleton-text skeleton-comic-title"></span>
              <span className="skeleton-text skeleton-comic-year"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

function Character() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<CharacterState>({
    character: null,
    comics: [],
    loading: true,
  });

  const { favorites, addFavorite, removeFavorite } = useMarvelStore();

  useEffect(() => {
    if (!id) return;

    api
      .get(`/characters/${id}`)
      .then((response) => {
        setState((prev) => ({
          ...prev,
          character: response.data.data.results[0],
        }));
      })
      .catch(console.error);

    api
      .get(`/characters/${id}/comics?limit=20&orderBy=onsaleDate`)
      .then((response) => {
        setState((prev) => ({
          ...prev,
          comics: response.data.data.results,
        }));
      })
      .catch(console.error)
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [id]);

  if (state.loading) return <SkeletonCharacter />;

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
            {state.character?.thumbnail ? (
              <img
                src={`${state.character.thumbnail.path}.${state.character.thumbnail.extension}`}
                alt={state.character.name}
                className="character-image"
              />
            ) : (
              <img
                src={noResultsImage}
                alt="No character found"
                className="character-image"
              />
            )}
          </div>

          <div className="character-info">
            <div className="character-title">
              <h1>
                {state.character
                  ? state.character.name.toUpperCase()
                  : "No character found"}
              </h1>
              {state.character && (
                <button
                  className="favorite-button-character"
                  onClick={() => {
                    if (!state.character) return;
                    const isFavorite = state.character
                      ? favorites.some((fav) => fav.id === state.character!.id)
                      : false;

                    if (isFavorite) {
                      removeFavorite(state.character.id);
                    } else {
                      addFavorite(state.character);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.some((fav) => fav.id === state.character?.id)
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
                {state.character
                  ? state.character.description || "Description coming soon..."
                  : "Try later."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="comics-section">
        {state.character && state.comics.length > 0 && <h2>COMICS</h2>}
        <div className="comics-list">
          {state.character && state.comics.length > 0 ? (
            state.comics.map((comic) => (
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
                      comic.dates.find((d) => d.type === "onsaleDate")?.date ||
                        ""
                    ).getFullYear() || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>{state.character ? "No comics available." : ""}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Character;
