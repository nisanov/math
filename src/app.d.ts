// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    namespace Superforms {
      type Message = {
        type: ToastType;
        content: string;
      };
    }
  }
}

export {};
