interface IArtistInput {
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}
interface IArtist extends IArtistInput {
  _id: string;
}
interface IArtistUpdate extends IArtistInput {
  id: string;
}

export { IArtist, IArtistInput, IArtistUpdate };
