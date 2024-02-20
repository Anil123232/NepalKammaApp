import {create} from 'zustand';
import { axios_auth } from '../../../global/config';

export const CreateGigStore = create(set => ({
  GigDetails: [],
  createGig: async (data: any) => {
    try {
      const response = await axios_auth.post('/gig/creategig', data);
      console.log(response.data);
      if (response.data.status === 'pending') {
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
  setGigDetails: (GigDetails: any) => set(() => ({GigDetails})),
}));
