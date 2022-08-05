export async function getCategories() {
  try {
    const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
    const request = await fetch(URL);
    const result = await request.json();
    return result;
  } catch (e) {
    return e.message;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    let URL = '';
    if (!categoryId) {
      URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    } else if (!query) {
      URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    } else {
      URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    }
    const request = await fetch(URL);
    const result = await request.json();
    return result;
  } catch (e) {
    return e.message;
  }
}
