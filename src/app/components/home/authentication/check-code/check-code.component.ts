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

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private authenticationService: AuthenticationService) {
    this.codeForm.addControl('code', new FormControl('', Validators.required));
    this.isRepeatButtonDisabled = true;
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
      login : this.authenticationService.getUserName(),
      code : this.codeForm.controls.code.value
    };
    this.authorizationService.sendCheckCodeRequest(userCode)
      .then((token: Token) => {
        this.router.navigate(['/']).then(() => {
          this.authenticationService.setAccessToken(token.accessToken);
          this.authenticationService.setRefreshToken(token.refreshToken);
        });
      })
      .catch((error) => this.errorMessage = error.error);
  }

  public repeatCode(): void{
    // TODO
  }
}
