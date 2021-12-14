export class Auth {
  get returnSecureToken(): boolean {
    return true;
  }

  constructor(public email: string, public password: string) {}
}
