import { VIA_WHATSAPP_NUMBER } from '../config'

export const whatsappService = {
  buildOrderMessage: (cart, subtotalFormatted, findProductFn, customer = {}, customWhatsappNumber = null) => {
    const number = customWhatsappNumber || VIA_WHATSAPP_NUMBER
    let msg = "✨ *VIA JEWELLERY ORDER*\n\n"
    
    msg += "🛍️ *ITEMS:*\n"
    cart.forEach((item, index) => {
      const p = findProductFn ? findProductFn(item.id) : null
      if (p) {
        msg += `${index + 1}. *${p.name}* x${item.qty}\n   Category: ${p.category}\n`
      } else {
        msg += `${index + 1}. Item #${item.id} x${item.qty}\n`
      }
    })

    msg += `\n💰 *ORDER TOTAL:* ${subtotalFormatted}\n\n`
    msg += "📍 *DELIVERY DETAILS:*\n"
    msg += `• Name: ${customer.name || 'Not provided'}\n`
    msg += `• Phone: ${customer.phone || 'Not provided'}\n`
    msg += `• Email: ${customer.email || 'Not provided'}\n`
    msg += `• Address: ${customer.address || ''} ${customer.city ? ', ' + customer.city : ''} ${customer.state ? ', ' + customer.state : ''} ${customer.pincode ? ' - ' + customer.pincode : ''}\n\n`
    msg += "Could you please confirm my order and share payment details?"

    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
  },

  sendDirectOrder: (productName, price, imgUrl, customWhatsappNumber = null) => {
    const number = customWhatsappNumber || VIA_WHATSAPP_NUMBER
    let msg = `Hi VIA! I'd like to order:\n\n*${productName}* — ${price}`
    if (imgUrl) {
      msg += `\nImage: ${imgUrl}`
    }
    msg += `\n\nCould you help me place this order?`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  },
}
