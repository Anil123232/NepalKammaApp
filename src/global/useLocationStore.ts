import {create} from 'zustand';

// Define the type for the location state
export interface LocationState {
  latitude: number;
  longitude: number;
}

// Define the initial state for the location
const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

// Create a Zustand store for managing the location state
const useLocationStore = create((set) => ({
  // Initial state
  location: initialLocationState,

  // Method to update the location
  setLocation: (latitude: number, longitude: number) =>
    set((state:any) => ({
      location: { latitude, longitude },
    })),
}));

export default useLocationStore;
