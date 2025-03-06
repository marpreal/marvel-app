export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicDate {
  type: string;
  date: string;
}

export interface Comic {
  id: number;
  title: string;
  description?: string;
  modified: string;
  format: string;
  pageCount: number;
  thumbnail: Thumbnail;
  resourceURI: string;
  dates: ComicDate[];
  characters: {
    available: number;
    items: { resourceURI: string; name: string }[];
  };
}

export interface CharacterType {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: {
    available: number;
    items: { resourceURI: string; name: string }[];
  };
}
