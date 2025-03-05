import Navbar from "./Navbar";

export const SkeletonCharacter = () => (
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
