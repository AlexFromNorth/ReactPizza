export interface PizzaItem {
  imageUrl: string;
  title: string;
  price: number;
}

export interface SortItem {
  name: string;
  sortProperty: string;
  filter: string;
}

export interface CategoriesProps {
  value: number;
  onChangeCategory: any;
}

export interface CartItemProps {
  id: string;
  imageUrl: string;
  price: number;
  size: number;
  title: string;
  type: string;
}

export interface PizzaBlockProps {
  imageUrl: number;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
  rating: number;
}
