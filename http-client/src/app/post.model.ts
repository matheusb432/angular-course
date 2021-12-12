import { AddMap } from 'mapper-ts/lib-esm';

export class Post {
  @AddMap('key')
  id?: string;
  title: string;
  content: string;
}
