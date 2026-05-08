export const selectProducts = (state) => state.products.items;
export const selectProductsTotal = (state) => state.products.total;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsSaving = (state) => state.products.saving;
export const selectProductsError = (state) => state.products.error;

export const selectProductById = (id) => (state) =>
  state.products.items.find((product) => String(product.id) === String(id));
