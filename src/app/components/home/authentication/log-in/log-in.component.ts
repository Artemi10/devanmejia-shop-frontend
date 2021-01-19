import {Component} from '@angular/core';
import {AuthorizationService} from "../../../../services/authorization/authorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication/authentication.service";
import {Token} from "../../../../models/token.model";




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent  {
  public logInForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';
  constructor(private authorizationService:AuthorizationService, private authenticationService: AuthenticationService) {
    this.logInForm.addControl("login", new FormControl("", Validators.required))
    this.logInForm.addControl("password", new FormControl("", Validators.required))
  }

  public checkInput(inputName: string): boolean{
    return this.logInForm.controls[inputName].invalid && this.logInForm.controls[inputName].touched;
  }

  public sendLogInRequest() {
    this.authorizationService.sendLogInUserRequest(this.logInForm.value)
      .then((data: Token)=>{
        this.authenticationService.setAccessToken(data.accessToken);
        this.authenticationService.setRefreshToken(data.refreshToken);
        window.location.replace('/')
      })
      .catch((error) => {
        if(error.status === 401){
          this.errorMessage = error.error
        }
      });
  }
}


