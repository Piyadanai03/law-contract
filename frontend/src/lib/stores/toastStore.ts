import { writable } from "svelte/store";

// กำหนดโครงสร้างของ Toast
export interface Toast {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error" | string;
}

export const toastStore = writable<Toast[]>([]);

export function addToast(message: string, type: string = "info", duration: number = 5000) {
  const id = Date.now();

  toastStore.update(toasts => {
    if (toasts.length >= 5) {
      toasts.shift(); 
    }
    return [...toasts, { id, message, type }];
  });

  setTimeout(() => {
    toastStore.update(toasts => toasts.filter(toast => toast.id !== id));
  }, duration);
}