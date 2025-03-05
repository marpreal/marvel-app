import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Home from "../Home";
import { useMarvelStore } from "../../store/useMarvelStore";
import api from "../../api/marvelApi";
import { BrowserRouter } from "react-router-dom";
import { JSX } from "react";

vi.mock("../../api/marvelApi", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: { results: [] } } }),
  },
}));

vi.mock("../../store/useMarvelStore", () => ({
  useMarvelStore: vi.fn(() => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  })),
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const renderWithRouter = (ui: JSX.Element) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it("displays characters after API load", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: {
          results: [
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
          ],
        },
      },
    });

    renderWithRouter(<Home />);

    await waitFor(() => screen.getByText("Iron Man"));
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("filters characters based on search input", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: {
          results: [
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
          ],
        },
      },
    });

    renderWithRouter(<Home />);

    await waitFor(() => screen.getByText("Iron Man"));

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Spider" } });

    await waitFor(() => {
      expect(screen.queryByText("Iron Man")).not.toBeInTheDocument();
      expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    });
  });

  it("adds and removes characters from favorites", async () => {
    const addFavoriteMock = vi.fn();
    const removeFavoriteMock = vi.fn();

    (useMarvelStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      favorites: [],
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
    });

    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: {
          results: [
            {
              id: 1,
              name: "Iron Man",
              thumbnail: { path: "path_to_image", extension: "jpg" },
            },
          ],
        },
      },
    });

    renderWithRouter(<Home />);

    await waitFor(() => screen.getByText("Iron Man"));

    const favButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favButton);

    expect(addFavoriteMock).toHaveBeenCalledWith({
      id: 1,
      name: "Iron Man",
      thumbnail: { path: "path_to_image", extension: "jpg" },
    });
  });

  it("handles API errors correctly", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("API error")
    );

    renderWithRouter(<Home />);

    await waitFor(() => {
      expect(
        screen.queryByText(
          /No results found. There are an API error, try later./i
        )
      ).toBeTruthy();
    });
  });
});
