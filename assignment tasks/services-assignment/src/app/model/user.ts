export class User {
  constructor(
    public id: number,
    public name: string,
    public active: boolean,
    public statusChangeCount = 0
  ) {}
}
