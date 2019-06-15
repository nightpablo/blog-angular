import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { CategoryService } from '../../services/category.services';
import { PostService } from '../../services/post.services';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService,CategoryService,PostService]
})
export class PostNewComponent implements OnInit {
	public page_title: string;
	public identity;
	public token;
	public post: Post;
	public categories;
	public status;
  public url;

	public froala_options: Object = {
	    charCounterCount: true,
      language: 'es',
	    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
	    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
	    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
	    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
	};
	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png, .gif, .jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+'post/upload',
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
  		private _route: ActivatedRoute,
  		private _router: Router,
  		private _userService: UserService,
  		private _categoryService: CategoryService,
  		private _postService:PostService
  	) { 
  	this.page_title = 'Crear una entrada';
  	this.identity = this._userService.getIdentify();
  	this.token = this._userService.getToken();
    this.url = global.url;

  }

  ngOnInit() {
  	this.getCategories();
  	this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
  }

  getCategories(){
  	this._categoryService.getCategories().subscribe(
  			response => {
  				if(response.status == 'success'){
  					this.categories = response.categories;
  				}
  			},
  			error => {

  			}

  		);
  }

  imageUpload(data){
  	let image_data = JSON.parse(data.response);
  	this.post.image = image_data.image;
  }

  onSubmit(form){
  	this._postService.create(this.token,this.post).subscribe(
  		response => {
  			if(response.status == 'success'){

  				this.post = response.post;
  				this.status = 'success';
  				this._router.navigate(['/inicio']);
  			}
  			else{
  				this.status = 'error';	
  			}
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
	);
  }
}
