export interface IValueObject<T> {
  equal(value: T): boolean;
}
