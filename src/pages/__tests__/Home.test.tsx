import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
import { useMarvelStore } from "../../store/useMarvelStore";
import { useCharacters } from "../../services/marvelService";
import { JSX } from "react";

vi.mock("../../services/marvelService", () => ({
  useCharacters: vi.fn(),
}));

vi.mock("../../store/useMarvelStore", () => ({
  useMarvelStore: vi.fn(() => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  })),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: vi.fn() },
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProviders = (ui: JSX.Element) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>,
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("displays characters after API load", async () => {
    (useCharacters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [
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
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<Home />);

    await waitFor(() => screen.getByText("Iron Man"));
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("filters characters based on search input", async () => {
    (useCharacters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [
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
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<Home />);

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

    (useCharacters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [
        {
          id: 1,
          name: "Iron Man",
          thumbnail: { path: "path_to_image", extension: "jpg" },
        },
      ],
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<Home />);

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
    (useCharacters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText("home.noResults")).toBeInTheDocument();
    });
  });
});
