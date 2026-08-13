export const analyticsAdapter = {
  trackEvent: (eventName, payload = {}) => {
    console.log(`[Analytics] Tracked: ${eventName}`, payload)
  },
  trackPageView: (pagePath) => {
    console.log(`[Analytics] Page View: ${pagePath}`)
  },
}
