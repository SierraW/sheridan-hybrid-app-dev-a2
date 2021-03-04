export interface Product {
  productId: string;
  description: string;
  quantityOnHand: bigint;
  pricePerUnit: number;
  reorderQuantity: bigint;
}
