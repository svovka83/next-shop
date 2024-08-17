//  методи для роботи з API - 'бекендом'

import * as products from "./products"; // всі функції з файлу 'products.ts' називаємо 'products'
import * as ingredients from "./ingredients"; // всі функції з файлу 'ingredients.ts' називаємо 'ingredients'
import * as cart from "./cart";
import * as auth from "./auth";

export const Api = {
  products,
  ingredients,
  cart,
  auth,
};
