import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const FetchJobStore = create(set => ({
  jobDetails: [],
  getJob: async (page: number, limit: number) => {
    try {
      const response = await axios_auth.get(`/job?page=${page}&limit=${limit}`);
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
  getNearbyJob: async (latitude: number, longitude: number) => {
    try {
      const response = await axios_auth.get(
        `/job/getNearbyJob/${latitude}/${longitude}`,
      );
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
  setJobDetails: (jobDetails: any) => set(() => ({jobDetails})),
}));
