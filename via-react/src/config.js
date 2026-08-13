// Replace with your real WhatsApp business number (country code, no +, no spaces)
export const VIA_WHATSAPP_NUMBER = '918075915386'

export const VIA_INSTAGRAM = 'https://www.instagram.com/house_of_via___'

export const whatsappLink = (message) =>
  `https://wa.me/${VIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
