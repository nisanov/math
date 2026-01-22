// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ToastMessage } from '$lib/client/state/toasts.svelte';

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      title?: string;
      flash?: ToastMessage;
    }
    interface PageState {
      user?: {
        id: string;
        username: string;
        createdAt: string;
        updatedAt: string;
      };
    }
    // interface Platform {}
    namespace Superforms {
      type Message = {
        type: ToastType;
        content: string;
      };
    }
  }
}

export {};
