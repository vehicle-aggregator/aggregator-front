import {DatePipe} from "@angular/common";

export function formatDate(value: any, format?: string): string | null {
  if (!value || isNaN(new Date(value) as any)) return '';
  return new DatePipe('en-US').transform(value, format || 'yyyy-MM-dd');
}
