import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Character from "../Character";
import { useCharacter, useCharacterComics } from "../../services/marvelService";
import { JSX } from "react";
import noResultsImage from "../../assets/no-results.jpg";

vi.mock("../../services/marvelService", () => ({
  useCharacter: vi.fn(),
  useCharacterComics: vi.fn(() => ({
    data: [],
    isLoading: false,
    isError: false,
  })),
}));

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: "1009368" })),
  };
});

vi.mock("../../store/useMarvelStore", () => ({
  useMarvelStore: vi.fn(() => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  })),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
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

describe("Character Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      id: "1009368",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays 'No character found' message if API returns empty", async () => {
    (useCharacter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    (useCharacterComics as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      {
        data: [],
        isLoading: false,
        isError: true,
      },
    );

    renderWithProviders(<Character />);

    await waitFor(() =>
      expect(screen.getByText("No character found")).toBeInTheDocument(),
    );
    expect(screen.getByAltText("No character found")).toHaveAttribute(
      "src",
      noResultsImage,
    );
  });

  it("handles API errors correctly", async () => {
    (useCharacter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    (useCharacterComics as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      {
        data: [],
        isLoading: false,
        isError: true,
      },
    );

    renderWithProviders(<Character />);

    await waitFor(() =>
      expect(screen.getByText("No character found")).toBeInTheDocument(),
    );
  });
});
