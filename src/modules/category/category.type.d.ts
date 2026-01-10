export type TCategory = {
  name: string;
  description: string;
}

export interface ICategory extends TCategory {
  id: number;
}