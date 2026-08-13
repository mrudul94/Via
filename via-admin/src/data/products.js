export const VIA_PRODUCTS = []

export const formatINR = (amount) =>
  '₹' + Number(amount || 0).toLocaleString('en-IN')
