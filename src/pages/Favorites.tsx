import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { CharacterType } from "../types/global";

function Favorites() {
  const [favorites, setFavorites] = useState<CharacterType[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      <div className="character-grid">
        {favorites.length > 0 ? (
          favorites.map((char) => (
            <CharacterCard key={char.id} character={char} loading={false} toggleFavorite={() => {}} favorites={favorites} />
          ))
        ) : (
          <p>You don’t have any favorite characters yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
