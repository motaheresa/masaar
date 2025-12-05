import { ToastOptions } from "react-toastify";

const baseToastConfig: ToastOptions = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Toast configuration presets for different types
export const toastConfig = {
  // Success toast configuration
  success: {
    ...baseToastConfig,
    autoClose: 3000,
  } as ToastOptions,

  // Error toast configuration
  error: {
    ...baseToastConfig,
    autoClose: 4000,
  } as ToastOptions,

  // Warning toast configuration
  warning: {
    ...baseToastConfig,
    autoClose: 3500,
  } as ToastOptions,

  // Info toast configuration
  info: {
    ...baseToastConfig,
    autoClose: 3000,
  } as ToastOptions,

  // Loading toast configuration (no auto-close)
  loading: {
    ...baseToastConfig,
    autoClose: false,
  } as ToastOptions,
};

// Helper function to get custom toast config with default values
export const getToastConfig = (
  type: "success" | "error" | "warning" | "info" | "loading",
  overrides?: Partial<ToastOptions>
): ToastOptions => {
  return {
    ...toastConfig[type],
    ...overrides,
  };
};
