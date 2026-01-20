import type { SuperValidated } from 'sveltekit-superforms';
import type { SuperFormData } from 'sveltekit-superforms/client';

type ToastType = 'info' | 'success' | 'warning' | 'error';

type ToastMessage = {
  type: ToastType;
  content: string;
};

type Toast = {
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

  public success(content: string): void {
    this.show({ type: 'success', content });
  }

  public error(content: string): void {
    this.show({ type: 'error', content });
  }

  public form(form: SuperValidated<Record<string, unknown>, string | undefined>): void {
    if (!form.valid) {
      for (const field in form.errors) {
        const messages = form.errors[field as keyof typeof form.errors];
        if (Array.isArray(messages)) {
          for (const message of messages) {
            toasts.error(message);
            break;
          }
        }
      }
    }

    if (form.message) {
      toasts.success(form.message);
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
