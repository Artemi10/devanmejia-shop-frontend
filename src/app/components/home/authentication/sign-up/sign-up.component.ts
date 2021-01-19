import {Component} from '@angular/core';
import {AuthorizationService} from "../../../../services/authorization/authorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication/authentication.service";
import {Token} from "../../../../models/token.model";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {
  public signUpForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';

  constructor(private authorizationService:AuthorizationService, private authenticationService: AuthenticationService) {
    this.signUpForm.addControl("firstName", new FormControl("", Validators.required))
    this.signUpForm.addControl("lastName", new FormControl("", Validators.required))
    this.signUpForm.addControl("login", new FormControl("", Validators.required))
    this.signUpForm.addControl("password", new FormControl("", Validators.required))
    this.signUpForm.addControl("rePassword", new FormControl("", [Validators.required, this.rePasswordValidator.bind(this)]))
    this.signUpForm.addControl("email", new FormControl("", [Validators.required, Validators.email]))
  }

  public checkInput(inputName: string): boolean{
    return this.signUpForm.controls[inputName].invalid && this.signUpForm.controls[inputName].touched;
  }

  public sendSignUpRequest(){
    this.authorizationService.sendSignUpUserRequest(this.signUpForm.value)
      .then((data: Token)=>{
      this.authenticationService.setAccessToken(data.accessToken);
      this.authenticationService.setRefreshToken(data.refreshToken);
      window.location.replace('/')
    }).catch((error) => {
        if(error.status === 401){
          this.errorMessage = error.error
        }
      });

  }

  private rePasswordValidator(control: FormControl): {[s:string]:boolean}{
    return control.value === this.signUpForm.get("password").value ? null : {
      NotEqual: true
    };
  }


}
