import { LoadingContextType } from "@/contexts/LoadingContext";

let loadingFunctions: LoadingContextType | null = null;

/**
 * Hàm này sẽ được gọi trong App.tsx để lưu lại context.
 */
export const setLoadingFunctions = (functions: LoadingContextType) => {
  loadingFunctions = functions;
};

/**
 * Gọi hàm showFullScreenLoading từ context.
 */
export const showFullScreenLoading = () => {
  loadingFunctions?.showFullScreenLoading();
};

/**
 * Gọi hàm tryHideFullScreenLoading từ context.
 */
export const tryHideFullScreenLoading = () => {
  loadingFunctions?.tryHideFullScreenLoading();
};
