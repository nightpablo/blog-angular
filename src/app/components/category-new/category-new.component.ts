import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { CategoryService } from '../../services/category.services';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
	public page_title: string;
	public identify;
	public token;
	public category: Category;
	public status: string;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _categoryService: CategoryService
  	) { 
  		this.page_title = "Crear nueva categoria";
  		this.identify = this._userService.getIdentify();
  		this.token = this._userService.getToken();
  		this.category = new Category(1, '');
  }

  ngOnInit() {
  }

  onSubmit(form){
  	this._categoryService.create(this.token,this.category).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.category = response.category;
  				this.status = 'success';

  				this._router.navigate(['/inicio']);
  			}
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
	);	
  }
}
