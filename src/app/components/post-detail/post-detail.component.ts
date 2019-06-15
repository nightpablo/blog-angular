import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.services';
import { UserService } from '../../services/user.services';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
	public post: Post;
  public identify;
  constructor(
  	private _postService: PostService,
    private _userService: UserService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) { 
    this.identify = this._userService.getIdentify();
  }

  ngOnInit() {
  	this.getPost();
  }

  getPost(){
  	// Sacar el id del post de la url
  	this._route.params.subscribe(params =>{
  		let id = +params['id'];
  		
  		// Peticion ajax para sacar los datos del post
  		this._postService.getPost(id).subscribe(
  			response => {
  				if(response.status == 'success'){
  					this.post = response.post;
  				}
  				else{
  					this._router.navigate(['/inicio']);
  				}
  			},
  			error => {
  				this._router.navigate(['/inicio']);
  			}
		);
  	});
  }

}
