import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../services/authorization/authorization.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';

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
          this.errorMessage = 'Code is correct';
        }
      });
  }

  public repeatCode(): void{
    this.authorizationService.updateVerifyResetCodeRequest(this.login)
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
