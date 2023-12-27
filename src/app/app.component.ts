import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './common/features/auth/store/reducers';
import { authActions } from './common/features/auth/store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {}
}
