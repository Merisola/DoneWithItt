import { create } from "zustand";

const useGameStore = create((set) => ({
  targetColor: "",
  colorOptions: [],
  setTargetColor: (color) => set({ targetColor: color }),
  setColorOptions: (options) => set({ colorOptions: options }),
}));

export default useGameStore;
