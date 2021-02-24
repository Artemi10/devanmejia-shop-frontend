import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  public forgetPasswordForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private authenticationService: AuthenticationService) {
    this.forgetPasswordForm.addControl('login', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.forgetPasswordForm.controls[inputName].invalid && this.forgetPasswordForm.controls[inputName].touched;
  }

  public sendLogin(): void{
    const login: string = this.forgetPasswordForm.controls.login.value;
    this.authorizationService.resetPasswordRequest(login)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.status === 200){
          this.authenticationService.setAccessToken(error.error.text);
          this.router.navigate(['/checkCode']);
        }
        else {
          this.errorMessage = error.error.text;
        }
      });
  }


}
