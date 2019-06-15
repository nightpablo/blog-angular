import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

	public page_title: string;
	public user: User;
	public identify;
	public token;
	public status: string;
	public url = global.url;
	public froala_options: Object = {
	    charCounterCount: true,
	    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	};
	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png, .gif, .jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+'user/upload',
	      headers: {
		     "Authorization" : this._userService.getToken()
	      }
	    },
	    theme: "attachPin",
	    hideProgressBar: false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    attachPinText: 'Sube tu avatar de usuario'
	};

  constructor(
  	private _userService: UserService
  	) { 
  	this.page_title = 'Ajustes de usuario';
  	
  	this.identify = this._userService.getIdentify();
  	this.token = this._userService.getToken();

  	// Rellenar objeto usuario
  	//this.user = this.identify;
  	this.user = new User(
  		this.identify.sub,
  		this.identify.name,
  		this.identify.surname, 
  		this.identify.role,
  		this.identify.email,
  		'', // PASSWORD
  		this.identify.description,
  		this.identify.image);
  }

  ngOnInit() {
  }

  onSubmit(form){
  	this._userService.update(this.token,this.user).subscribe(
  		response => {
  			if(response && response.status){
  				this.status = 'success';

  				if(response.changes.name){
  					this.user.name = response.changes.name;
  				}
  				if(response.changes.surname){
  					this.user.surname = response.changes.surname;
  				}
  				if(response.changes.email){
  					this.user.email = response.changes.email;
  				}
  				if(response.changes.description){
  					this.user.description = response.changes.description;
  				}
  				if(response.changes.image){
  					this.user.image = response.changes.image;
  					console.log('aca entro');
  					console.log(this.user.image);
  				}
  				// Actualizar usuario en sesión
  				this.identify = response.user;
  				localStorage.setItem('identify', JSON.stringify(this.identify));
  			}
  			else{
  				this.status = 'error';
  			}
  			console.log(response);
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
  	);
  }

  avatarUpload(datos){
  	console.log(datos.response);
  	let data = JSON.parse(datos.response);
  	this.user.image = data.image;
  }

}
