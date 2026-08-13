import { productDB } from '../data-integrations/productDB'

export const productService = {
  getAllProducts: () => productDB.getProducts(),
  getProductById: (id) => productDB.getProductById(id),
  searchProducts: (query) => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return productDB.getProducts().filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  },
  getCareSpecs: () => ({
    material: 'Premium Anti-Tarnish Coating over Stainless Steel / Alloy',
    waterResistance: '100% Water-Safe & Sweat-Proof',
    hypoallergenic: 'Lead & Nickel Free',
  }),
}
