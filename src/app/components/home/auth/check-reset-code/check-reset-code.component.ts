import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokensService} from '../../../../services/tokens/tokens.service';
import {Token} from '../../../../models/tokens/tokens.model';

@Component({
  selector: 'app-check-reset-code',
  templateUrl: './check-reset-code.component.html',
  styleUrls: ['./check-reset-code.component.css']
})
export class CheckResetCodeComponent implements OnDestroy {
  public codeForm: FormGroup = new FormGroup({});
  public errorMessage = '';
  public isRepeatButtonDisabled: boolean;
  public login: string;

  constructor(private authService: AuthService, private router: Router, private tokensService: TokensService) {
    this.codeForm.addControl('code', new FormControl('', Validators.required));
    this.isRepeatButtonDisabled = true;
    this.login = this.tokensService.getUserName();
  }

  ngOnDestroy(): void {
    this.tokensService.deleteAccessToken();
  }

  public checkInput(controlName: string): boolean{
    return this.codeForm.controls[controlName].invalid
      && this.codeForm.controls[controlName].touched;
  }

  public timerStopEventListener(): void{
    this.isRepeatButtonDisabled = false;
  }

  public sendCode(): void{
    this.authService.sendCheckResetCodeRequest(this.codeForm.controls.code.value)
      .subscribe((token: Token) => {
        this.tokensService.setAccessToken(token);
        this.router.navigate(['/reset'])
          .then(() => this.tokensService.setAccessToken(token));
      }, error => {
        this.isRepeatButtonDisabled = false;
        this.errorMessage = error.error;
      });
  }

  public repeatCode(): void{
    this.authService.updateVerifyResetCodeRequest()
      .subscribe(() => {
        this.errorMessage = '';
        this.isRepeatButtonDisabled = true;
      }, error => {
        this.tokensService.deleteAccessToken();
        this.router.navigate(['/logIn']);
      });
  }
}
