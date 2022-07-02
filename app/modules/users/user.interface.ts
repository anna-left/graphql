interface IUserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface IUser extends IUserInput {
  _id: string;
}

export { IUser, IUserInput };
