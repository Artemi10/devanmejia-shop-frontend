import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokensService} from '../../../../services/tokens/tokens.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Token} from '../../../../models/tokens/tokens.model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  public forgetPasswordForm: FormGroup = new FormGroup({});
  public errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private tokensService: TokensService) {
    this.forgetPasswordForm.addControl('login', new FormControl('', Validators.required));
  }

  public checkInput(inputName: string): boolean{
    return this.forgetPasswordForm.controls[inputName].invalid
      && this.forgetPasswordForm.controls[inputName].touched;
  }

  public sendLogin(): void{
    const login: string = this.forgetPasswordForm.controls.login.value;
    this.authService.resetPasswordRequest(login)
      .subscribe((token: Token) => {
        this.tokensService.setAccessToken(token);
        this.router.navigate(['/checkReset']);
      }, error => this.errorMessage = error.error.text);
  }


}
