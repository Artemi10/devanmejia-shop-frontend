import {Component} from '@angular/core';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent  {
  public logInForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private authorizationService: AuthorizationService, private authenticationService: AuthenticationService,
              private router: Router) {
    this.logInForm.addControl('login', new FormControl('', Validators.required));
    this.logInForm.addControl('password', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.logInForm.controls[inputName].invalid && this.logInForm.controls[inputName].touched;
  }

  public sendLogInRequest(): void {
    this.authorizationService.sendLogInUserRequest(this.logInForm.value)
      .catch((error) => {
        if (error.status === 200){
          this.authenticationService.setAccessToken(error.error.text);
          this.router.navigate(['/checkCode']);
        }
        if (error.status === 401){
          this.errorMessage = error.error;
        }
      });
  }
}


