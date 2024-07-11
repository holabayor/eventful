export interface ICreate<T> {
  create(data: T): Promise<T>;
}

export interface IRead<T> {
  findById(id: string): Promise<T | null>;
  findByField(fieldName: string, value: any): Promise<T | null>;
}

export interface IUpdate<T> {
  update(id: string, data: Partial<T>): Promise<T | null>;
}

export interface IDelete {
  delete(id: string): Promise<boolean>;
}
