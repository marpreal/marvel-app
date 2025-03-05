import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import Character from "../Character";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../api/marvelApi";
import { JSX } from "react";
import noResultsImage from "../../assets/no-results.jpg";

vi.mock("../../api/marvelApi", () => ({
  default: {
    get: vi.fn(),
  },
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

vi.mock("../../api/marvelApi", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { data: { results: [] } } })),
  },
}));

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
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

  it("displays character information after API load", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [
              {
                id: 1009368,
                name: "Iron Man",
                description: "A billionaire in an armored suit.",
                thumbnail: { path: "path_to_image", extension: "jpg" },
              },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [],
          },
        },
      });

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("IRON MAN"));
    expect(
      screen.getByText("A billionaire in an armored suit.")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Iron Man")).toHaveAttribute(
      "src",
      expect.stringContaining("path_to_image.jpg")
    );
  });

  it("displays 'No character found' message if API returns empty", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { results: [] } },
    });

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("No character found"));
    expect(screen.getByAltText("No character found")).toHaveAttribute(
      "src",
      noResultsImage
    );
    expect(screen.getByText("Try later.")).toBeInTheDocument();
  });

  it("hides favorite button if no character is found", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: { results: [] } },
    });

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("No character found"));
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("displays comics if available", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [
              {
                id: 1009368,
                name: "Iron Man",
                description: "A billionaire in an armored suit.",
                thumbnail: { path: "path_to_image", extension: "jpg" },
              },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [
              {
                id: 1,
                title: "Iron Man: Extremis",
                thumbnail: { path: "comic_image", extension: "jpg" },
                dates: [{ type: "onsaleDate", date: "2005-12-21T00:00:00Z" }],
              },
            ],
          },
        },
      });

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("COMICS"));
    expect(screen.getByText("Iron Man: Extremis")).toBeInTheDocument();
    expect(screen.getByText("2005")).toBeInTheDocument();
  });

  it("hides comics title when there are no comics", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [
              {
                id: 1009368,
                name: "Iron Man",
                description: "A billionaire in an armored suit.",
                thumbnail: { path: "path_to_image", extension: "jpg" },
              },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            results: [],
          },
        },
      });

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("IRON MAN"));
    expect(screen.queryByText("COMICS")).not.toBeInTheDocument();
  });

  it("handles API errors correctly", async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("API error")
    );

    renderWithRouter(<Character />);

    await waitFor(() => screen.getByText("No character found"));
  });
});
