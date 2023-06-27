export class User {
  static findByIdAndUpdate(
    userId: string,
    arg1: { phoneNumber: string }
  ): User | PromiseLike<User | null> | null {
    throw new Error('Method not implemented.');
  }
  id!: string;
  email!: string;
  name!: string;
  phoneNumber!: string;
  address!: string;
  token!: string;
  isAdmin!: boolean;
}
