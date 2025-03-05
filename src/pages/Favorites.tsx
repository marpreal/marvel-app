import { useEffect, useState } from "react";
import { FavoritesState } from "./types";
import CharacterCard from "../components/CharacterCard";

function Favorites() {
  const [state, setState] = useState<FavoritesState>({ favorites: [] });

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setState({ favorites: JSON.parse(savedFavorites) });
    }
  }, []);

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      <div className="character-grid">
        {state.favorites.length > 0 ? (
          state.favorites.map((char) => (
            <CharacterCard key={char.id} character={char} loading={false} toggleFavorite={() => {}} favorites={state.favorites} />
          ))
        ) : (
          <p>You don’t have any favorite characters yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
