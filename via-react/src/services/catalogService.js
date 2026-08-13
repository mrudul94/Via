import { productDB } from '../data-integrations/productDB'

export const catalogService = {
  getCategories: () => productDB.getCategories(),
  getCuratedEdits: () => productDB.getEdits(),
  getNewArrivals: () => productDB.getProducts().slice(0, 4),
}
