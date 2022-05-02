import {DatePipe} from "@angular/common";

export function formatDate(value: any, format?: string): string | null {
  if (!value || isNaN(new Date(value) as any)) return '';
  return new DatePipe('en-US').transform(value, format || 'yyyy-MM-dd');
}

export function formatTimeFromDate(d: Date): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function setTimeToDate(baseDate: Date, time: string): any {
  const [hours, minutes] = time.split(':');
  baseDate.setHours(Number(hours), Number(minutes), 0, 0);
  return baseDate;
}
