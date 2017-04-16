export interface ServerUser {
  username: string;
  firstName: string;
  lastName: string;
}

export class User {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(serverResponse: ServerUser) {
    this.username = serverResponse.username;
    this.firstName = serverResponse.firstName;
    this.lastName = serverResponse.lastName;
  }
}