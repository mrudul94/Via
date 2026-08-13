import { cmsRepository } from '../features/cms/services/cmsRepository'

export const productDB = {
  getProducts: () => cmsRepository.loadData().products,
  getProductById: (id) => cmsRepository.loadData().products.find((p) => p.id === id),
  getCategories: () => cmsRepository.loadData().categories,
  getHero: () => cmsRepository.loadData().hero,
  getSettings: () => cmsRepository.loadData().settings,
  getMarquee: () => cmsRepository.loadData().marquee,
  getReviews: () => cmsRepository.loadData().reviews,
}
