/**
 * Функція для розрахунку товару в корзині
 *
 * @param variantPrice - ціна варіанту товару
 * @param quantity - кількість
 * @param ingredients - масив інгредіїнтів
 * @returns - number загальна ціна
 */
export const calcCartItemTotalPrice = (
  variantPrice: number,
  quantity: number,
  ingredients: number[]
) => {
  const ingredientsPrice = ingredients.reduce(
    (acc, ingredientsPrice) => acc + ingredientsPrice,
    0
  );
  const totalPrice = (variantPrice + ingredientsPrice) * quantity;

  return totalPrice;
};
