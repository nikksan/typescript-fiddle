export default interface IHasher {
  make(plain: string): string;
  check(plain: string, hash: string): boolean;
}
