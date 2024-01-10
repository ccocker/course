import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '@miCommon/features/auth/store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
