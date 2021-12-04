export class User {
  constructor(
    public name: string,
    public active: boolean,
    public statusChangeCount = 0
  ) {}
}
