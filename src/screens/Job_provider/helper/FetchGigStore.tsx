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
  searchGig: async (
    searchText: string,
    category: string,
    selectedDistance: number | null,
    lowToHigh: boolean,
    highToLow: boolean,
    sortByRating: boolean,
    page: number,
    limit: number,
    lat: any | null,
    long: any | null,
  ) => {
    try {
      const response = await axios_auth.get(
        `/gig/searchgig?text=${searchText}&category=${category}&sortByRating=${sortByRating}&sortByPriceHighToLow=${highToLow}&sortByPriceLowToHigh=${lowToHigh}&lng=${long}&lat=${lat}&distance=${selectedDistance}&page=${page}&limit=${limit}`,
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

  setGigDetails: (GigDetails: any) => set(() => ({GigDetails})),
}));
