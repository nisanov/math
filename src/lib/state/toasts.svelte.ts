import type { SuperValidated } from 'sveltekit-superforms';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastMessage = {
  type: ToastType;
  content: string;
};

export type Toast = {
  id: string;
  message: ToastMessage;
};

const DELAY: Record<ToastType, number> = {
  success: 5000,
  info: 6000,
  warning: 7000,
  error: 8000
};

class Toasts {
  values: Toast[] = $state([]);
  ids: Map<string, NodeJS.Timeout> = $state(new Map<string, NodeJS.Timeout>());

  public error(content: string): void {
    this.show({ type: 'error', content });
  }

  public form(
    form: SuperValidated<Record<string, unknown>, App.Superforms.Message | undefined>
  ): void {
    if (!form.valid) {
      for (const field in form.errors) {
        const messages = form.errors[field];
        if (Array.isArray(messages)) {
          for (const message of messages) {
            toasts.error(message);
          }
        }
      }
    }

    if (form.message) {
      toasts.show(form.message);
    }
  }

  public show(message: ToastMessage): void {
    const toast = { id: crypto.randomUUID(), message };
    this.values.push(toast);
    this.ids.set(
      toast.id,
      setTimeout((): void => {
        this.values = this.values.filter((toasted: Toast): boolean => toasted.id !== toast.id);
        this.ids.delete(toast.id);
      }, DELAY[message.type])
    );
  }

  public remove(id: string): void {
    clearTimeout(this.ids.get(id));
    this.values = this.values.filter((toasted: Toast): boolean => toasted.id !== id);
    this.ids.delete(id);
  }
}

export const toasts = new Toasts();
