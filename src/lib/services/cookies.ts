import type { Cookies } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export class CookieService {
  private readonly cookie: Cookies;
  private readonly options: CookieSerializeOptions & { path: string } = {
    path: '/',
    sameSite: 'strict'
  };

  constructor(cookie: Cookies) {
    this.cookie = cookie;
  }

  public getUser(): User | undefined {
    const user = this.cookie.get('user');
    if (user) {
      return JSON.parse(user);
    }

    return undefined;
  }

  public setQuestions(questions: number): void {
    this.cookie.set('questions', String(questions), this.options);
  }

  public getQuestions(): number {
    const questions = this.cookie.get('questions');
    if (questions) {
      return Number.parseInt(questions);
    }

    this.cookie.set('questions', '5', this.options);

    return 5;
  }

  public setSequence(sequence: number): void {
    this.cookie.set('sequence', String(sequence), this.options);
  }

  public getSequence(): number {
    const sequence = this.cookie.get('sequence');
    if (sequence) {
      return Number.parseInt(sequence);
    }

    this.cookie.set('sequence', '0', this.options);

    return 0;
  }
}
