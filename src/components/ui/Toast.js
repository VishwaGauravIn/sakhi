import { enqueueSnackbar } from "notistack";

export const toast = {
  success: (message) => {
    enqueueSnackbar(message, { variant: "success" });
  },
  error: (message) => {
    enqueueSnackbar(message, { variant: "error" });
  },
  warning: (message) => {
    enqueueSnackbar(message, { variant: "warning" });
  },
  info: (message) => {
    enqueueSnackbar(message, { variant: "info" });
  },
  default: (message) => {
    enqueueSnackbar(message);
  },
};
