import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService {
	public url: string;
	public identify;
	public token;
	constructor(
		public _http: HttpClient){
		this.url = global.url;
	}

	test(){
		return "Hola mundo desde un servicio";
	}

	register(user): Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'register', params, {headers: headers});

	}


  signup(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json='+json;
	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

	return this._http.post(this.url+'login', params, {headers: headers});    
  }

  getIdentify(){
  	let identify = JSON.parse(localStorage.getItem('identify'));

  	if(identify && identify != 'undefined'){
  		this.identify = identify;
  	}
  	else{
  		this.identify = null;
  	}
  	return this.identify;
  }

  getToken(){
  	let token = localStorage.getItem('token');

  	if(token && token != 'undefined'){
  		this.token = token;
  	}
  	else{
  		this.token = null;
  	}
  	return this.token;
  }

  update(token, user): Observable<any>{
    // Limpiar campo content (editor texto enriquecido) htmlEntities > utf8
    user.description = global.htmlEntities(user.description);
  	let json = JSON.stringify(user);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  									.set('Authorization', token);

	return this._http.put(this.url + 'user/update', params, {headers: headers});
  }

  getPosts(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post/user/' + id, {headers: headers});
  }
  getUser(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'user/detail/' + id, {headers: headers});
  }
}