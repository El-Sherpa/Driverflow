import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'admin' | 'empresa' | 'cliente' | null;

export interface User {
  username: string;
  role: UserRole;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Intentar cargar usuario de localStorage si existe
    const savedUser = localStorage.getItem('driveflow_user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, role: UserRole): boolean {
    const user: User = {
      username,
      role,
      name: username.charAt(0).toUpperCase() + username.slice(1)
    };
    this.currentUserSubject.next(user);
    localStorage.setItem('driveflow_user', JSON.stringify(user));
    return true;
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('driveflow_user');
  }

  getUserRole(): Observable<string | null> {
    return new Observable(observer => {
      this.currentUser$.subscribe(user => {
        observer.next(user ? user.role : null);
      });
    });
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserValue?.role === role;
  }
}
