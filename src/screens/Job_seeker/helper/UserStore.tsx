import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const UserStore = create(set => ({
  editProfile: async (id: string, data: any) => {
    try {
      const response = await axios_auth.put(`/user/edit-profile/${id}`, data);
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
}));
