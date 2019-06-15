import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { CategoryService } from '../../services/category.services';
import { PostService } from '../../services/post.services';
import { Category } from '../../models/category';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService,PostService]
})
export class CategoryDetailComponent implements OnInit {
	public page_title: string;
	public identify;
	public token;
	public category: Category;
	public status: string;
	public posts: any;
	public url: string;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _categoryService: CategoryService,
  	private _postService: PostService
  	) { 
  	this.url = global.url;
  	this.identify = this._userService.getIdentify();
  	this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getPostsByCategory();
  }

  getPostsByCategory(){
  	this._route.params.subscribe(params=>{
  		let id = +params['id'];

  		this._categoryService.getCategory(id).subscribe(
  			response =>{
  				if(response.status == 'success'){
  					this.category = response.category;
  					
  					this._categoryService.getPosts(id).subscribe(
  						response =>{
  							if(response.status == 'success'){
  								this.posts = response.posts;
  							}
  							else{
  								this._router.navigate(['/inicio']);			
  							}
  						},
  						error =>{
  							this.status= 'error';
  							console.log(<any>error);
  						}
					);
  				}
  				else{
  					this._router.navigate(['/inicio']);
  				}
  			},
  			error =>{
  				this.status= 'error';
  				console.log(<any>error);
  			}
  		);
  	});
  }

  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
