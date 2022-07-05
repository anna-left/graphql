interface IBandInput {
  name: string;
  origin: string;
  membersId: IMember[];
  website: string;
  genresIds: string[];
}

interface IBand extends IBandInput {
  _id: string;
}

interface IBandUpdate extends IBandInput {
  id: string;
}

interface IMember {
  artist: string;
  instrument: string;
  years: string;
}
export { IBand, IBandInput, IBandUpdate, IMember };
