import uuid from 'uuid';
import Entity from '../../../domain/Entity';
import Repository from '../../../domain/Repository';

class InMemoryRepository<T extends Entity> implements Repository<T> {
  protected entities: T[];

  constructor() {
    this.entities = [];
  }

  public async save(entity: T) {
    if (entity.getId()) {
      if (await this.findById(entity.getId())) {
        return this.update(entity);
      }

      throw new Error('Attempted to save entity with id which we could not identify!');
    }

    return this.create(entity);
  }

  public async findById(id: number | string) {
    return this.entities.find(e => e.getId() === id);
  }

  public async findAll() {
    return this.entities;
  }

  private create(entity: T) {
    entity.setId(this.getNextId());
    entity.setCreatedAt(new Date());
    entity.setUpdatedAt(new Date());

    this.entities.push(entity);

    return entity;
  }

  private update(entity: T) {
    entity.setUpdatedAt(new Date());
    
    this.entities = this.entities.map(e => entity.equals(e) ? entity : e);
    return entity;
  }

  private getNextId() {
    return uuid();
  }
}

export default InMemoryRepository;
