import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCardProps } from "./types";
import heartDefault from "../assets/state-default.png";
import heartUnselected from "../assets/state-unselected.png";

const SkeletonCard: React.FC = () => (
  <div className="character-card skeleton">
    <div className="image-container skeleton-image"></div>
    <div className="card-footer">
      <span className="character-name skeleton-text"></span>
      <div className="favorite-button skeleton-button"></div>
    </div>
  </div>
);

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  toggleFavorite,
  favorites,
  loading,
}) => {
  const navigate = useNavigate();

  if (loading || !character) {
    return (
      <>
        {Array.from({ length: 50 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <div
      className={`character-card ${isFavorite ? "favorited" : ""}`}
      onClick={() => navigate(`/character/${character.id}`)}
    >
      <div className="image-container">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
        />
        <div className="red-line"></div>
      </div>

      <div className="card-footer">
        <span className="character-name" title={character.name}>
          {character.name.length > 13
            ? `${character.name.slice(0, 13)}...`
            : character.name}
        </span>

        <button
          className="favorite-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(character);
          }}
        >
          <img
            src={isFavorite ? heartDefault : heartUnselected}
            className="heart-icon"
            alt="Favorite Icon"
          />
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
