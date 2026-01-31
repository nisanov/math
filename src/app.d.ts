// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ToastMessage } from '$lib/state/toasts.svelte';

declare global {
  namespace App {
    interface PageData {
      title?: string;
      flash?: ToastMessage;
    }
    namespace Superforms {
      type Message = {
        type: ToastType;
        content: string;
      };
    }
  }
}

export {};
