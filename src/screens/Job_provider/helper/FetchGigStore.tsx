import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const FetchGigStore = create(set => ({
  GigDetails: [],
  getGig: async () => {
    try {
      const response = await axios_auth.get('/gig');
      if (response.status === 200) {
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
