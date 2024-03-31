import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const KhaltiStore = create(set => ({
  createPayment: async (
    PaymentBy: string,
    PaymentTo: string,
    job: string,
    amount: number,
  ) => {
    try {
      const response = await axios_auth.post(`/payment/createPayment/`, {
        PaymentBy,
        PaymentTo,
        job,
        amount,
      });
      if (response.status == 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
  getPaymentByUser: async () => {
    try {
      const response = await axios_auth.get(`/payment/getPaymentByProvider`);
      if (response.status == 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
  requestPayment: async (id: string) => {
    try {
      const response = await axios_auth.put(`/payment/requestPayment/${id}`);
      if (response.status == 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
}));
