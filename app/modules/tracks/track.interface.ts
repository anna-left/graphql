interface ITrackInput {
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}
interface ITrack extends ITrackInput {
  _id: string;
}

export { ITrack, ITrackInput };
