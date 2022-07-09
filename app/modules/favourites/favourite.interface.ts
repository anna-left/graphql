interface IFavourite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

interface IFavouriteInput {
  id: string;
  type: string;
}

export { IFavourite, IFavouriteInput };
