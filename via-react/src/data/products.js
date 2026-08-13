// ============================================================
// VIA — dynamic CMS product data loader
// All products are fully retrieved dynamically from the CMS repository.
// ============================================================
import { cmsRepository, DEFAULT_PRODUCTS } from '../features/cms/services/cmsRepository'

export const getActiveProducts = () => cmsRepository.loadData().products || DEFAULT_PRODUCTS

export const findProduct = (id) => {
  const products = getActiveProducts()
  return products.find((p) => String(p.id) === String(id)) || null
}

export const VIA_PRODUCTS = DEFAULT_PRODUCTS

