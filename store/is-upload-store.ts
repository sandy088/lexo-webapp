import { create } from "zustand";

interface useUploadStoreINterface {
  isUploaded: boolean;
  setIsUpload: (isUpload: boolean) => void;
}

export const useUploadStore = create<useUploadStoreINterface>((set) => ({
  isUploaded: false,
  setIsUpload: (isUpload) => set({ isUploaded: isUpload }),
}));
