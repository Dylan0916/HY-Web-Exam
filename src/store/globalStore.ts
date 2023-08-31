import { create } from 'zustand';

type GlobalStoreState = {
  isProgressBarMoving: boolean;
  setIsProgressBarMoving: (isProgressBarMoving: boolean) => void;
  shouldMute: boolean;
  setShouldMute: (shouldMute: boolean) => void;
};

const useGlobalStore = create<GlobalStoreState>(set => ({
  isProgressBarMoving: false,
  setIsProgressBarMoving: isProgressBarMoving => set({ isProgressBarMoving }),
  shouldMute: true,
  setShouldMute: shouldMute => set({ shouldMute }),
}));

export default useGlobalStore;

export const stateSelector = (state: GlobalStoreState) => state;
export const isProgressBarMovingSelector = (state: GlobalStoreState) =>
  state.isProgressBarMoving;
export const setIsProgressBarMovingSelector = (state: GlobalStoreState) =>
  state.setIsProgressBarMoving;
export const shouldMuteSelector = (state: GlobalStoreState) => state.shouldMute;
export const setShouldMuteSelector = (state: GlobalStoreState) =>
  state.setShouldMute;
