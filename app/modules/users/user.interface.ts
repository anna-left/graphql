interface IUserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface IUser extends IUserInput {
  _id: string;
}
interface IJwt {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export { IUser, IUserInput, IJwt };
