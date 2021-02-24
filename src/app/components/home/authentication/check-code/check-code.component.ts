import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {Token} from '../../../../models/token.model';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {Router} from '@angular/router';

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

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private authenticationService: AuthenticationService) {
    this.codeForm.addControl('code', new FormControl('', Validators.required));
    this.isRepeatButtonDisabled = true;
    this.login = this.authenticationService.getUserName();
  }

  ngOnDestroy(): void {
    this.authenticationService.deleteAccessToken();
  }

  public checkInput(controlName: string): boolean{
    return this.codeForm.controls[controlName].invalid
      && this.codeForm.controls[controlName].touched;
  }

  public timerStopEventListener(): void{
    this.isRepeatButtonDisabled = false;
  }

  public sendCode(): void{
    const userCode = {
      login : this.login,
      code : this.codeForm.controls.code.value
    };
    if (this.authenticationService.getUserRole() === 'ROLE_PASSWORD_RESET'){
      this.authorizationService.sendCheckResetCodeRequest(userCode)
        .then((data) => console.log(data))
        .catch((error) => {
          if (error.status === 200){
            this.authenticationService.setAccessToken(error.error.text);
            this.router.navigate(['/reset'])
              .then(() => this.authenticationService.setAccessToken(error.error.text));
          }
          else{
            this.isRepeatButtonDisabled = false;
            this.errorMessage = error.error.text;
          }
        });
    }
    if (this.authenticationService.getUserRole() === 'ROLE_UNAUTH_USER'){
      this.authorizationService.sendCheckLogInCodeRequest(userCode)
        .then((token: Token) => {
          this.router.navigate(['/']).then(() => {
            this.authenticationService.setAccessToken(token.accessToken);
            this.authenticationService.setRefreshToken(token.refreshToken);
          });
        })
        .catch(() => {
          this.errorMessage = 'Code is incorrect';
          this.isRepeatButtonDisabled = false;
        });
    }
  }

  public repeatCode(): void{
    this.authorizationService.updateVerifyCodeRequest(this.login)
      .then(() => {
        this.errorMessage = '';
        this.isRepeatButtonDisabled = true;
      })
      .catch(() => {
        this.authenticationService.deleteAccessToken();
        this.router.navigate(['/logIn']);
    });
  }
}
