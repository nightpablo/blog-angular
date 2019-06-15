import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.services';
import { UserService } from '../../services/user.services';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { global } from '../../services/global';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
	
	public url;
	public posts: Array<Post>;
	public user:User;
	public identify;
	public token;

  constructor(
  		private _userService: UserService,
  		private _postService: PostService,
  		private _route: ActivatedRoute,
  		private _router: Router
  	) { 
  	
  	this.url = global.url;
  	this.identify = this._userService.getIdentify();
  	this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getProfile();
  	
  }

  getProfile(){
  	this._route.params.subscribe(params=>{
  		let userId = +params['id'];
  		this.getUser(userId);
  		this.getPosts(userId);
  	})
  }

  getUser(userId){
  	this._userService.getUser(userId).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.user = response.user;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
	);
  }

  getPosts(userId){
  	this._userService.getPosts(userId).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.posts = response.posts;

  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
	);
  }

  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
