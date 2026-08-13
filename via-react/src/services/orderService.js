import { whatsappService } from './whatsappService'

export const orderService = {
  createOrder: (cartData, total) => {
    return {
      orderId: 'VIA_' + Date.now(),
      status: 'Pending',
      items: cartData,
      total,
    }
  },
  processWhatsAppCheckout: (cartData, total) => {
    const link = whatsappService.buildOrderMessage(cartData, total)
    window.open(link, '_blank')
  },
}
