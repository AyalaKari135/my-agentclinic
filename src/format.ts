/** `2026-11-09T10:30` -> `2026-11-09 10:30` */
export function formatDateTime(value: string): string {
  return value.replace('T', ' ')
}
