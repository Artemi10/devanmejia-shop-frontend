import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokensService} from '../../../../services/tokens/tokens.service';
import {Token} from '../../../../models/tokens/tokens.model';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent  {
  public logInForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private tokensService: TokensService, private router: Router,
              private authService: AuthService) {
    this.logInForm.addControl('login', new FormControl('', Validators.required));
    this.logInForm.addControl('password', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.logInForm.controls[inputName].invalid
      && this.logInForm.controls[inputName].touched;
  }

  public sendLogInRequest(): void {
    this.authService.sendLogInUserRequest(this.logInForm.value)
      .subscribe((token: Token) => {
          this.tokensService.setAccessToken(token);
          this.router.navigate(['/checkCode']);
        }, error => this.errorMessage = error.error);
  }
}


