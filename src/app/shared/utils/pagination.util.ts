// src/app/shared/utils/pagination.util.ts
export function paginate<T>(
  items: T[], 
  page: number, 
  itemsPerPage: number
): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}

export function calculateTotalPages(
  totalItems: number, 
  itemsPerPage: number
): number {
  return Math.ceil(totalItems / itemsPerPage) || 1;
}