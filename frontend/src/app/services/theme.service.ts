// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';

  setThemePreference(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getThemePreference(): string | null {
    return localStorage.getItem(this.THEME_KEY);
  }

  toggleTheme(): void {
    const currentTheme = this.getThemePreference();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setThemePreference(newTheme);
    document.body.classList.toggle('lightTheme');
  }
}
