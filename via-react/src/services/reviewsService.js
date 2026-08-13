import { cmsRepository } from '../features/cms/services/cmsRepository'

export const reviewsService = {
  getVerifiedReviews: () => cmsRepository.loadData().reviews,
}
