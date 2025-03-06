import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import Favorites from "../Favorites";
import { BrowserRouter } from "react-router-dom";
import { JSX } from "react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: vi.fn() },
  }),
}));

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Favorites Component", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      return null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("displays message when no favorites are saved", () => {
    renderWithRouter(<Favorites />);

    expect(screen.getByText("favorites.title")).toBeInTheDocument();
    expect(screen.getByText("favorites.emptyMessage")).toBeInTheDocument();
  });

  it("loads favorites from localStorage and displays them", () => {
    const mockFavorites = [
      {
        id: 1,
        name: "Iron Man",
        thumbnail: { path: "path_to_image", extension: "jpg" },
      },
      {
        id: 2,
        name: "Spider-Man",
        thumbnail: { path: "path_to_image", extension: "jpg" },
      },
    ];

    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      return JSON.stringify(mockFavorites);
    });

    renderWithRouter(<Favorites />);

    expect(screen.getByText("favorites.title")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });
});
