import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public user: User;
	public status: string;
	public token;
	public identify;

  constructor(
  	private _userService: UserService,
  	private _router: Router,
  	private _route: ActivatedRoute
  	) {
  	this.page_title = 'Identificate';
  	this.user = new User(1, '', '', 'ROLE_USER', '', '', '' , '');
  }

  ngOnInit() {
  	// Se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
  	this.logout();
  }

  onSubmit(form){
  	this._userService.signup(this.user).subscribe(
  			response =>{
  				// TOKEN
  				if(response.status != 'error'){
  					this.status = 'success';
  					this.token = response;

  					// OBJETO USUARIO AUTENTICADO
  					this._userService.signup(this.user, true).subscribe(
  							response =>{
  								this.identify = response;

  								// Persistir datos usuario autenticado
  								localStorage.setItem('token', this.token);
  								localStorage.setItem('identify', JSON.stringify(this.identify));

  								// redirección a Inicio
  								this._router.navigate(['inicio']);
  							},
  							error => {
  								this.status = 'error';
  								console.log(<any>error);
  							}
  						);
  				}
  			},
  			error => {
  				this.status = 'error';
  				console.log(<any>error);
  			}
  		);
  }


  logout(){
  	this._route.params.subscribe(params =>{
  		let logout = +params['sure'];

  		if(logout == 1){
  			localStorage.removeItem('identify');
  			localStorage.removeItem('token');

  			this.identify = null;
  			this.token = null;

  			// redirección a Inicio
  			this._router.navigate(['inicio']);
  		}
  	});
  }
}
