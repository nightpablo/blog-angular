import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.services';

@Injectable()
export class IdentityGuard implements CanActivate{
	
	constructor(
		private _router: Router,
		private _userService: UserService
	)
	{

	}

	canActivate(){
		let identity = this._userService.getIdentify();

		if(identity){
			return true;
		}
		else{
			this._router.navigate(['/error']);
			return false;
		}
	}
}