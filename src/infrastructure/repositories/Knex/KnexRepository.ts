import Knex from 'knex'
import uuid from 'uuid';
import Entity from '../../../domain/Entity';
import Repository from '../../../domain/Repository';

abstract class KnexRepository<T extends Entity> implements Repository<T> {
	protected queryBuilder: Knex;
	
	constructor(config: Knex.Config) {
		this.queryBuilder = Knex(config);
	}

	public abstract findById(id: string): Promise<T | null>;
  public abstract findAll(): Promise<T[]>;
  public abstract save(entity: T): Promise<T>;

  protected getNextId() {
    return uuid();
  }
}

export default KnexRepository;