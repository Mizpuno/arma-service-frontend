import { Component, OnInit } from '@angular/core';
import { MenuActionInterface, MenuInterface } from '../arma-lib/interfaces/menu.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'arma-service-frontend';
  sampleForm: FormGroup;

  public menuAction: MenuActionInterface | null = null;
  public colors: string[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'base'];

  constructor(private fb: FormBuilder) {
    this.sampleForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      Validators: this.passwordMatchValidator
    })
  }
  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    form.get('password')?.value === form.get('comfirmPassword')?.value 
      ? null
      : {passwordMismatch : true}
  }

  onFormSubmit() {
    console.log('submitting.....')
    if (this.sampleForm.valid) {
      console.log("VALID")
    } else {
      this.sampleForm.markAllAsTouched();
    }
  }

  onGetMenus(menuAction: MenuActionInterface | null) {
    this.menuAction = menuAction;
  }
}
