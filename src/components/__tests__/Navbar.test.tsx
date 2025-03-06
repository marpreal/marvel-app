import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { JSX } from "react";

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Navbar Component", () => {
  it("renders correctly", () => {
    renderWithRouter(
      <Navbar
        favoritesCount={0}
        toggleShowFavorites={() => {}}
        resetShowFavorites={() => {}}
      />,
    );

    expect(screen.getByAltText("Marvel Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Favorites")).toBeInTheDocument();
  });

  it("calls resetShowFavorites when Marvel logo is clicked", () => {
    const resetShowFavoritesMock = vi.fn();
    renderWithRouter(
      <Navbar
        favoritesCount={0}
        toggleShowFavorites={() => {}}
        resetShowFavorites={resetShowFavoritesMock}
      />,
    );

    const logo = screen.getByAltText("Marvel Logo");
    fireEvent.click(logo);

    expect(resetShowFavoritesMock).toHaveBeenCalled();
  });

  it("calls toggleShowFavorites when favorites icon is clicked", () => {
    const toggleShowFavoritesMock = vi.fn();
    renderWithRouter(
      <Navbar
        favoritesCount={0}
        toggleShowFavorites={toggleShowFavoritesMock}
        resetShowFavorites={() => {}}
      />,
    );

    const favoritesIcon = screen.getByAltText("Favorites");
    fireEvent.click(favoritesIcon);

    expect(toggleShowFavoritesMock).toHaveBeenCalled();
  });

  it("displays the favorites count when favorites exist", () => {
    renderWithRouter(
      <Navbar
        favoritesCount={5}
        toggleShowFavorites={() => {}}
        resetShowFavorites={() => {}}
      />,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("does not show favorites count when there are no favorites", () => {
    renderWithRouter(
      <Navbar
        favoritesCount={0}
        toggleShowFavorites={() => {}}
        resetShowFavorites={() => {}}
      />,
    );

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
