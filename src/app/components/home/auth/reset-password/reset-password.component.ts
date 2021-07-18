import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokensService} from '../../../../services/tokens/tokens.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public resetPasswordForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private tokensService: TokensService) {
    this.resetPasswordForm.addControl('password', new FormControl('', Validators.required));
    this.resetPasswordForm.addControl('rePassword', new FormControl('', [Validators.required, this.rePasswordValidator.bind(this)]));
  }

  public updatePassword(): void{
    this.authService.updatePasswordRequest(this.resetPasswordForm.controls.password.value)
      .subscribe(() => {
        this.tokensService.deleteAccessToken();
        this.router.navigate(['/logIn']);
      }, error => this.errorMessage = error.error);
  }

  public checkInput(inputName): boolean{
    return this.resetPasswordForm.controls[inputName].invalid && this.resetPasswordForm.controls[inputName].touched;
  }

  private rePasswordValidator(control: FormControl): {[s: string]: boolean}{
    return control.value === this.resetPasswordForm.get('password').value ? null : {
      NotEqual: true
    };
  }

}
