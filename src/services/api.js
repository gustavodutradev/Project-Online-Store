export async function getCategories() {
  try {
    const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
    const request = await fetch(URL);
    const result = await request.json();
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query, sortId) {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}&category=${categoryId}&sort=${sortId}`;
    const request = await fetch(URL);
    const result = await request.json();
    return result;
  } catch (e) {
    console.log(e.message);
  }
}
