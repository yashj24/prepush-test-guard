import { capitalizeString } from "../src/capitalizeString";
import { expect } from "chai";

describe("capitalizeString", () => {
  it("capitalizes the first letter", () => {
    expect(capitalizeString("hello")).to.equal("Hello");
    expect(capitalizeString("world")).to.equal("World");
  });

  it("returns empty string for empty input", () => {
    expect(capitalizeString("")).to.equal("");
  });
});
