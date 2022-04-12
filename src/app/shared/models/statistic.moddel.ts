export class Statistic {
  name: string;
  icon: string;
  value: number;
  percent: number;
}

export enum Period {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly'
}
