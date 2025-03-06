import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter, useNavigate } from "react-router-dom";
import CharacterCard from "../CharacterCard";
import { CharacterType } from "../../types/global";
import { JSX } from "react";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
});

const mockCharacter: CharacterType = {
  id: 1009368,
  name: "Iron Man",
  description: "A billionaire in an armored suit.",
  thumbnail: {
    path: "path_to_image",
    extension: "jpg",
  },
  modified: "2023-01-01T00:00:00Z",
  resourceURI: "http://example.com/character/1009368",
  comics: {
    available: 0,
    items: [],
  },
};

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("CharacterCard Component", () => {
  it("renders skeleton when loading", () => {
    renderWithRouter(
      <CharacterCard loading={true} toggleFavorite={() => {}} favorites={[]} />,
    );
    expect(screen.getAllByText("").length).toBeGreaterThan(0);
  });

  it("renders character details correctly", () => {
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={() => {}}
        favorites={[]}
      />,
    );
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByAltText("Iron Man")).toHaveAttribute(
      "src",
      expect.stringContaining("path_to_image.jpg"),
    );
  });

  it("navigates to character page on click", () => {
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={() => {}}
        favorites={[]}
      />,
    );
    fireEvent.click(screen.getByText("Iron Man"));
    expect(mockNavigate).toHaveBeenCalledWith("/character/1009368");
  });

  it("toggles favorite state on button click", () => {
    const toggleFavoriteMock = vi.fn();
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={toggleFavoriteMock}
        favorites={[]}
      />,
    );
    const favButton = screen.getByRole("button");
    fireEvent.click(favButton);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockCharacter);
  });

  it("shows favorite icon when character is favorited", () => {
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={() => {}}
        favorites={[mockCharacter]}
      />,
    );
    expect(screen.getByAltText("Favorite Icon")).toHaveAttribute(
      "src",
      expect.stringContaining("state-default.png"),
    );
  });

  it("shows unfavorite icon when character is not favorited", () => {
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={() => {}}
        favorites={[]}
      />,
    );
    expect(screen.getByAltText("Favorite Icon")).toHaveAttribute(
      "src",
      expect.stringContaining("state-unselected.png"),
    );
  });

  it("does not navigate when favorite button is clicked", () => {
    renderWithRouter(
      <CharacterCard
        character={mockCharacter}
        toggleFavorite={() => {}}
        favorites={[]}
      />,
    );
    const favButton = screen.getByRole("button");
    fireEvent.click(favButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
