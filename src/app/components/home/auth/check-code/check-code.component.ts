import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokensService} from '../../../../services/tokens/tokens.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Tokens} from '../../../../models/tokens/tokens.model';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.css']
})
export class CheckCodeComponent implements OnDestroy{
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
    this.authService.sendCheckCodeRequest(this.codeForm.controls.code.value)
      .subscribe((tokens: Tokens) => {
        this.router.navigate(['/']).then(() => {
          this.tokensService.setTokens(tokens);
        });
      }, error => {
        this.errorMessage = error.error;
        this.isRepeatButtonDisabled = false;
      });
  }

  public repeatCode(): void{
    this.authService.updateVerifyCodeRequest()
      .subscribe(() => {
        this.errorMessage = '';
        this.isRepeatButtonDisabled = true;
      }, error => {
        this.tokensService.deleteAccessToken();
        this.router.navigate(['/logIn']);
      });
  }
}
