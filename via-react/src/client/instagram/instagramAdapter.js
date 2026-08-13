import { VIA_INSTAGRAM } from '../../config'
import { cmsRepository } from '../../features/cms/services/cmsRepository'

export const instagramAdapter = {
  openProfile: () => {
    window.open(VIA_INSTAGRAM, '_blank')
  },
  getFeedImages: () => cmsRepository.loadData().settings.instaFeed || [],
}
