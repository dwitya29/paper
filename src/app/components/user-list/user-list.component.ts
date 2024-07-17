
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import { User } from '../../types/user.types';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  displayedColumns = ['name', 'email', 'phone']
  users: User[] = []
  isLoading = true

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserList().subscribe(data => {
      this.users = data
      this.isLoading = false
    })
  }

  goToUserDetail(id: number): void {
    this.router.navigate(['/user', id])
  }
}
