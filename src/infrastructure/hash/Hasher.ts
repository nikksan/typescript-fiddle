export default interface Hasher {
  make(plain: string): string;
  check(plain: string, hash: string): boolean;
}
