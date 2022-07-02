interface IGenreInput {
  name: string;
  description: string;
  country: string;
  year: string;
}

interface IGenre extends IGenreInput {
  _id: string;
}

export { IGenre, IGenreInput };
