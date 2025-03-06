import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../SearchBar";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) =>
      key === "searchBar.results" && options?.count !== undefined
        ? `${options.count} results`
        : key,
    i18n: { changeLanguage: vi.fn() },
  }),
}));

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    render(<SearchBar onSearch={() => {}} resultsCount={0} />);

    expect(
      screen.getByPlaceholderText("searchBar.placeholder"),
    ).toBeInTheDocument();
    expect(screen.getByText("0 results")).toBeInTheDocument();
  });

  it("updates input value when user types", () => {
    render(<SearchBar onSearch={() => {}} resultsCount={0} />);

    const input = screen.getByPlaceholderText(
      "searchBar.placeholder",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Spider-Man" } });

    expect(input.value).toBe("Spider-Man");
  });

  it("calls onSearch with the correct value", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} resultsCount={0} />);

    const input = screen.getByPlaceholderText("searchBar.placeholder");
    fireEvent.change(input, { target: { value: "Hulk" } });

    expect(mockOnSearch).toHaveBeenCalledWith("Hulk");
  });

  it("shows the correct number of results", () => {
    render(<SearchBar onSearch={() => {}} resultsCount={5} />);

    expect(screen.getByText("5 results")).toBeInTheDocument();
  });

  it("calls onSearch with empty string when input is cleared", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} resultsCount={0} />);

    const input = screen.getByPlaceholderText("searchBar.placeholder");
    fireEvent.change(input, { target: { value: "Thor" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(mockOnSearch).toHaveBeenCalledWith("");
  });
});
