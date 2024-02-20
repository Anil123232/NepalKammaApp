import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const JobStore = create(set => ({
  jobDetails: [],
  createJob: async (data: any) => {
    try {
      const response = await axios_auth.post('/job/createJob', data);
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
  setJobDetails: (jobDetails: any) => set(() => ({jobDetails})),
}));
