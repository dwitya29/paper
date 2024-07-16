
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import { User } from '../../types/user.types';

@Component({
  imports: [
    CommonModule,
  ],
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: User[] = []
  displayedColumns = ['name', 'email', 'phone']

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserList().subscribe(data => {
      this.users = data
    })
  }
}
