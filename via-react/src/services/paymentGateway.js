export const paymentGateway = {
  initiatePayment: async (orderId, amount) => {
    console.log(`Initiating direct payment gateway for order ${orderId} amount: ₹${amount}`)
    return { success: true, transactionId: 'TXN_' + Date.now() }
  },
}
