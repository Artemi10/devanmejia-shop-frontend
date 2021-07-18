import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokensService} from '../../../../services/tokens/tokens.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Token} from '../../../../models/tokens/tokens.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {
  public signUpForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private tokensService: TokensService, private authService: AuthService, private router: Router) {
    this.signUpForm.addControl('firstName', new FormControl('', Validators.required));
    this.signUpForm.addControl('lastName', new FormControl('', Validators.required));
    this.signUpForm.addControl('login', new FormControl('', Validators.required));
    this.signUpForm.addControl('password', new FormControl('', Validators.required));
    this.signUpForm.addControl('rePassword', new FormControl('', [Validators.required, this.rePasswordValidator.bind(this)]));
    this.signUpForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.signUpForm.addControl('birthDate', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.signUpForm.controls[inputName].invalid
      && this.signUpForm.controls[inputName].touched;
  }

  public sendSignUpRequest(): void{
    this.authService.sendSignUpUserRequest(this.signUpForm.value)
      .subscribe((token: Token) => {
        this.tokensService.setAccessToken(token);
        this.router.navigate(['/checkCode']);
        }, error =>  {
        if (error.status === 404){
          this.errorMessage = error.error;
        }
        else{
          this.errorMessage = 'Can not sign up user';
        }
      });

  }

  private rePasswordValidator(control: FormControl): {[s: string]: boolean}{
    return control.value === this.signUpForm.get('password').value ? null : {
      NotEqual: true
    };
  }


}
