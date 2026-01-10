export type TBook = {
  categoryId: number | null;
  title: string;
  author: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export interface IBook extends TBook {
  id: number;
}