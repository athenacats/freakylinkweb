import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userObservable.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
