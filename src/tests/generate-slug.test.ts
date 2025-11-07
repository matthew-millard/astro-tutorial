import { generateSlug } from "@utils/generate-slug";
import { describe, expect, it } from "vitest";

describe("generateSlug", () => {
  it("converts spaces to hyphens", () => {
    expect(generateSlug("hello world")).toEqual("hello-world");
  });

  it("converts uppercase to lowercase", () => {
    expect(generateSlug("HELLO")).toEqual("hello");
  });

  it("handles multiple consecutive spaces", () => {
    expect(generateSlug("Hello  World")).toEqual("hello-world");
  });

  it("removes special characters", () => {
    expect(generateSlug("Hello, World!")).toEqual("hello-world");
  });
});
