export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  disabled?: boolean;
}

export type CartIngredient = {
  id: number;
  name: string;
};
