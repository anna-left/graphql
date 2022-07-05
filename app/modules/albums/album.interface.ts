interface IAlbumInput {
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

interface IAlbum extends IAlbumInput {
  _id: string;
}
interface IAlbumUpdate extends IAlbumInput {
  id: string;
}

export { IAlbum, IAlbumInput, IAlbumUpdate };
