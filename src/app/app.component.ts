import { Component, OnInit } from '@angular/core';
import { MenuActionInterface, MenuInterface } from '../arma-lib/interfaces/menu.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../arma-lib/services/auth.service';
import { UserService } from '../arma-lib/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'arma-service-frontend';
  public menuAction: MenuActionInterface | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.login().subscribe(res => {
      if (res.response.code === 200) {
        this.authService.updateSessionToken(res.content.token);
        this.userService.updateSessionUser(res.content.user);
      }
    })
  }

  onGetMenus(menuAction: MenuActionInterface | null) {
        this.menuAction = menuAction;
    }
}
