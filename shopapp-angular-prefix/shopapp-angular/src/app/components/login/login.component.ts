import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginDto} from "../../dtos/user/login.dto";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginResponse} from "../../responses/user/login.response"
import {TokenService} from "../../services/token.service";
import {RoleService} from "../../services/role.service";
import {Role} from "../../models/role";
import {UserResponse} from "../../responses/user/user.response";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm !: NgForm;
  phoneNumber: string;
  password: string;
  roles: Role[] = [];
  selectedRole: Role | undefined;
  rememberMe: boolean;
  userResponse?: UserResponse;
  constructor(private router: Router,
              private userService: UserService,
              private roleService: RoleService,
              private tokenService: TokenService) {
    this.phoneNumber = '';
    this.password ='';
    this.rememberMe = false;
  }
  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
        next: (roles: Role[]) => {
          debugger
          this.roles = roles;
          this.selectedRole = roles.length > 0 ? roles[0] : undefined;
        },
        error: (error: any) => {
          debugger
          alert(error?.error?.message)
        }
      }
    )
  }
  login(){
    const loginDto: LoginDto = {
      phone_number:this.phoneNumber,
      password:this.password,
      role_id: this.selectedRole?.id ?? 1
    }

    this.userService.login(loginDto)
      .subscribe({
          next: (response: LoginResponse) => {
            debugger
            const {token} = response
            if (this.rememberMe){
              this.tokenService.setToken(token);
              debugger;
              this.userService.getUserDetails(token).subscribe({
                next: (userDetails: any) => {
                  debugger;
                  this.userResponse = {
                    ...userDetails,
                    date_of_birth: new Date(userDetails.date_of_birth)
                  };
                  this.userService.saveUserResponseLocalStorage(this.userResponse);
                  if (this.userResponse?.role.name == 'admin'){
                   this.router.navigate(['/admin']);
                  } else if (this.userResponse?.role.name == 'user') {
                    this.router.navigate(['/']);
                  }
                },
                complete: () => {
                  debugger
                },
                error: (error : any) => {
                  debugger
                  alert(error.error.message);
                }
              })
            }
          },
          complete: () => {
            debugger
          },
          error: (error : any) => {
            debugger
            alert(error.error.message);
          }
        }
      );
  }
  onPhoneChange(){
    console.log(this.phoneNumber)
  }
  validatePhoneNumber(){
    if (this.phoneNumber.length<6){

    }
  }

}
