import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { CharacterType } from "../types/global";
import { useTranslation } from "react-i18next";

function Favorites() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<CharacterType[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="favorites-container">
      <h1>{t("favorites.title")}</h1>
      <div className="character-grid">
        {favorites.length > 0 ? (
          favorites.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              loading={false}
              toggleFavorite={() => {}}
              favorites={favorites}
            />
          ))
        ) : (
          <p>{t("favorites.emptyMessage")}</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
