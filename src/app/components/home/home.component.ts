import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.services';
import { UserService } from '../../services/user.services';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
	public page_title: string;
	public url;
	public posts: Array<Post>;
	public identify;
	public token;
  constructor(
  		private _userService: UserService,
  		private _postService: PostService
  	) { 
  	this.page_title = 'Inicio';
  	this.url = global.url;
  	this.identify = this._userService.getIdentify();
  	this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getPosts();
  }

  getPosts(){
  	this._postService.getPosts().subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.posts = response.posts;

  				console.log(this.posts);
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
        this.getPosts();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
