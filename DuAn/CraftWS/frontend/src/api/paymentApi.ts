import axiosClient from './axiosClient';

const paymentApi = {
  createVNPay: (data: { bookingId?: string; orderId?: string; amount: number }) =>
    axiosClient.post('/payments/vnpay', data),
  createMoMo: (data: { bookingId?: string; orderId?: string; amount: number }) =>
    axiosClient.post('/payments/momo', data),
  verifyPayment: (params: Record<string, string>) =>
    axiosClient.get('/payments/verify', { params }),
};

export default paymentApi;
