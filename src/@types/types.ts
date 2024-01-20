// export interface PizzaItem {
//   imageUrl: string;
//   title: string;
//   price: number;
// }

export interface SortItem {
  name: string;
  sortProperty: string;
  filter: string;
}

export interface CategoriesProps {
  value: number;
  onChangeCategory: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface CartItemProps {
  id: string;
  imageUrl: string;
  price: number;
  size: number;
  title: string;
  type: string;
  totalPrice: number;
  item: CartItem;
  index: number;
}

export interface PizzaBlockProps {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
  rating: number;
}


// slices types
export interface CartItem{
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count?: number;
}

export interface CartSliceState{
  totalPrice: number;
  items: CartItem[];
}

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
  filter: 'desc' | 'asc';
}
export interface FilterSliceState{
  searchValue: string;
  categoryId: number,
  sort: Sort;
}

export enum Status{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  pizzas: PizzaItem[],
  status: Status,
}

export interface PizzaItem {
  category: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
  rating: number;
}

