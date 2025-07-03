import type { Document } from "./document";

export type SortOrder = "asc" | "desc";

export function sortDocuments(
  docs: Document[],
  key: keyof Document,
  order: SortOrder = "asc",
): Document[] {
  const compare = (a: Document, b: Document): number => {
    if (key === "Title") {
      return a.Title.localeCompare(b.Title, undefined, { sensitivity: "base" });
    }
    if (key === "Version") {
      return compareVersions(a.Version, b.Version);
    }
    if (key === "UpdatedAt") {
      const d1 = new Date(a.UpdatedAt);
      const d2 = new Date(b.UpdatedAt);
      return d1.getTime() - d2.getTime();
    }
    return 0;
  };
  const sorted = docs.slice().sort((a, b) => {
    const res = compare(a, b);
    return order === "asc" ? res : -res;
  });
  return sorted;
}

function compareVersions(v1: string, v2: string): number {
  const split = (v: string) => v.split(".").map(Number);

  const a = split(v1);
  const b = split(v2);

  const [aMajor, aMinor, aPatch] = a;
  const [bMajor, bMinor, bPatch] = b;

  if (aMajor !== bMajor) {
    return aMajor - bMajor;
  }

  if (aMinor !== bMinor) {
    return aMinor - bMinor;
  }

  if (aPatch !== bPatch) {
    return aPatch - bPatch;
  }

  return 0;
}
