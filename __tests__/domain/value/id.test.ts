import { describe, expect, test } from "@jest/globals";
import { Id } from "../../../src/domain/valueobject/id";

describe("constructor", () => {
  test("instance creation", () => {
    const parameter = 11;
    const id = new Id(parameter);
    expect(id instanceof Id).toBeTruthy();
  });

  test("instance creation failed negative id", () => {
    const parameter = -11;
    expect(() => new Id(parameter)).toThrow("id should be greater than zero");
  });

  test("instance creation failed id is not integer", () => {
    const parameter = 1.23;
    expect(() => new Id(parameter)).toThrow("id should be integer value");
  });
});

describe("property", () => {
  test("value", () => {
    const parameter = 11;
    const id = new Id(parameter);
    expect(id.Value).toBe(11);
  });
});

describe("equal", () => {
  test("same id object", () => {
    const left = new Id(11);
    const right = new Id(11);
    expect(left.equal(right)).toBeTruthy();
  });

  test("not same id object", () => {
    const left = new Id(11);
    const right = new Id(22);
    expect(left.equal(right)).toBeFalsy();
  });
});
