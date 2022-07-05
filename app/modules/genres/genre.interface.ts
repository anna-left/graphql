interface IGenreInput {
  name: string;
  description: string;
  country: string;
  year: string;
}

interface IGenre extends IGenreInput {
  _id: string;
}

interface IGenreUpdate extends IGenreInput {
  id: string;
}

export { IGenre, IGenreInput, IGenreUpdate };
