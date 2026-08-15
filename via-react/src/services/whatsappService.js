import { VIA_WHATSAPP_NUMBER, whatsappLink } from '../config'

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
    msg += `• Name: ${customer.fullName || customer.name || 'Not provided'}\n`
    msg += `• Phone: ${customer.phone || 'Not provided'}\n`
    msg += `• Email: ${customer.email || 'Not provided'}\n`
    msg += `• Address: ${customer.address || ''} ${customer.district || customer.city ? ', ' + (customer.district || customer.city) : ''} ${customer.state ? ', ' + customer.state : ''} ${customer.pincode ? ' - ' + customer.pincode : ''}\n\n`
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

  buildBuyNowOrderMessage: ({ product, quantity, variant, customer, totalFormatted }) => {
    let msg = "✨ *VIA JEWELLERY — BUY NOW ORDER REQUEST*\n\n"
    msg += "🛍️ *ITEM DETAILS:*\n"
    msg += `• Product: *${product.name}*\n`
    msg += `• Item ID: ${product.id}\n`
    if (variant) {
      msg += `• Variant: ${variant}\n`
    }
    msg += `• Quantity: ${quantity}\n`
    msg += `• Listed Price: ₹${product.price}\n`
    msg += `• Estimated Total: ${totalFormatted}\n\n`
    msg += "📍 *DELIVERY ADDRESS:*\n"
    msg += `• Name: ${customer.fullName || 'Not provided'}\n`
    msg += `• Phone: ${customer.phone || 'Not provided'}\n`
    msg += `• Address: ${customer.address || ''}\n`
    msg += `• District: ${customer.district || ''}\n`
    msg += `• State: ${customer.state || ''}\n`
    msg += `• PIN Code: ${customer.pincode || ''}\n`
    if (customer.note && customer.note.trim()) {
      msg += `• Order Note: ${customer.note.trim()}\n`
    }
    msg += "\n*Note: Please confirm current database price, variant, and payment details.*"
    return whatsappLink(msg)
  },

  buildBuyNowEnquiryMessage: ({ product, enquiryNote }) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://houseofvia.com'
    const pdpUrl = `${origin}/product/${product.id}`
    let msg = "✨ *VIA JEWELLERY — PRODUCT ENQUIRY*\n\n"
    msg += `Hi VIA! I have a question regarding:\n`
    msg += `• Product: *${product.name}*\n`
    msg += `• Link: ${pdpUrl}\n\n`
    msg += `📝 *ENQUIRY:* ${enquiryNote || 'Is this item available for express delivery?'}`
    return whatsappLink(msg)
  },
}
