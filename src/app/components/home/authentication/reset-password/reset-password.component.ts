import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public resetPasswordForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private authenticationService: AuthenticationService) {
    this.resetPasswordForm.addControl('password', new FormControl('', Validators.required));
    this.resetPasswordForm.addControl('rePassword', new FormControl('', [Validators.required, this.rePasswordValidator.bind(this)]));
  }

  public updatePassword(): void{
    this.authorizationService.updatePasswordRequest(this.resetPasswordForm.controls.password.value)
      .subscribe(() => {
        this.authenticationService.deleteAccessToken();
        this.router.navigate(['/logIn']);
      }, error => this.errorMessage = error.error);
  }

  // TODO refactor to service
  public checkInput(inputName): boolean{
    return this.resetPasswordForm.controls[inputName].invalid && this.resetPasswordForm.controls[inputName].touched;
  }

  private rePasswordValidator(control: FormControl): {[s: string]: boolean}{
    return control.value === this.resetPasswordForm.get('password').value ? null : {
      NotEqual: true
    };
  }

}
