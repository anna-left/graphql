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

export { IAlbum, IAlbumInput };
