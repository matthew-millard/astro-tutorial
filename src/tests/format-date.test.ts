import { formatDate } from "@utils/format-date";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("formatDate", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("returns date formatted as 'do MMM, yyyy'", () => {
    vi.setSystemTime(new Date("2025-05-19T00:00-05:00"));
    expect(formatDate(new Date())).toEqual("19th May, 2025");
  });

  it("handles 1st, 2nd, 3rd ordinal suffixes correctly", () => {
    vi.setSystemTime(new Date("2025-05-01T00:00-05:00"));
    expect(formatDate(new Date())).toEqual("1st May, 2025");

    vi.setSystemTime(new Date("2025-05-02T00:00-05:00"));
    expect(formatDate(new Date())).toEqual("2nd May, 2025");

    vi.setSystemTime(new Date("2025-05-03T00:00-05:00"));
    expect(formatDate(new Date())).toEqual("3rd May, 2025");

    vi.setSystemTime(new Date("2025-05-21T00:00-05:00"));
    expect(formatDate(new Date())).toEqual("21st May, 2025");
  });
});
