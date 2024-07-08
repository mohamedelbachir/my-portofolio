export interface Item {
  title: string;
  at?: string;
  dateRange?: string;
  description?: string;
  icon: string;
  classes?: {
    container?: string;
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
    at?: string;
    date?: string;
  };
}
