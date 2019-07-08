export default interface Repository<T> {
  findById(id: number | string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}
