import type { Document } from "../domain/document";

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
    if (key === "CreatedAt") {
      const d1 = new Date(a.CreatedAt);
      const d2 = new Date(b.CreatedAt);
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
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const n1 = a[i] ?? 0;
    const n2 = b[i] ?? 0;
    if (n1 !== n2) return n1 - n2;
  }
  return 0;
}
