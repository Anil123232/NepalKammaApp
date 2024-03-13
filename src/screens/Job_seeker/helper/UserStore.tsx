import {create} from 'zustand';
import {axios_auth} from '../../../global/config';

export const UserStore = create(set => ({
  editProfile: async (id: string, data: any) => {
    try {
      const response = await axios_auth.put(`/user/edit-profile/${id}`, data);
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
  updatePhoneNumber: async (phone: any) => {
    try {
      console.log(phone);
      const response = await axios_auth.put(`/user/update-phone`, {
        phone: phone,
      });
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
  getSingleUser: async (id: string) => {
    try {
      const response = await axios_auth.get(`/user/user/${id}`);
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

}));
