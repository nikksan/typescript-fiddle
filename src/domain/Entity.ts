class Entity {
	private id: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(dto: any) {
		if (dto.id !== undefined) {
			this.setId(dto.id);
		}

		if (dto.createdAt) {
			this.setCreatedAt(dto.createdAt);
		}

		if (dto.updatedAt) {
			this.setUpdatedAt(dto.updatedAt);
		}
	}

	getId() {
		return this.id;
	}

	setId(id: string) {
		this.id = id;
	}

	setCreatedAt(createdAt: Date) {
		this.createdAt = createdAt;
	}

	getCreatedAt() {
		return this.createdAt;
	}

	setUpdatedAt(updatedAt: Date) {
		this.updatedAt = updatedAt;
	}

	getUpdateddAt() {
		return this.updatedAt;
	}

	equals(anotherEntity: Entity) {
		return this.id === anotherEntity.getId();
	}

	isPersisted() {
		return !!this.createdAt;
	}
}

export default Entity;