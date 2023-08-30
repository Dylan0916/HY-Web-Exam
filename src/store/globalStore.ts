import { create } from 'zustand';

type GlobalStoreState = {
  isProgressBarMoving: boolean;
  setIsProgressBarMoving: (isProgressBarMoving: boolean) => void;
};

const useGlobalStore = create<GlobalStoreState>(set => ({
  isProgressBarMoving: false,
  setIsProgressBarMoving: isProgressBarMoving => set({ isProgressBarMoving }),
}));

export default useGlobalStore;
