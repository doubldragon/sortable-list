export type ListItem = {
  id: string;
  item: string;
  number: number | null;
  order: number;
  notes?: string;
};

export type TeamConfig = {
  black: number | null;
  blue: number | null;
  gray: number | null;
  white: number | null;
};
