import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.services';
import { CategoryService } from './services/category.services';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'Blog de Angular';
  public identify;
  public token;
  public url;
  public categories;

  constructor(
  	private _userService: UserService,
    private _categoryService: CategoryService
  	){
  	this.loadUser();
    this.url = global.url;
  }

  ngOnInit(){
  	console.log("Webapp cargada correctamente :)");
    this.getCategories();
  }

  ngDoCheck(){
  	this.loadUser();
  }

  loadUser(){
  	this.identify = this._userService.getIdentify();
  	this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
          if(response.status == 'success'){
            this.categories = response.categories;
          }
      },
      error => {
        console.log(error);
      }
    );
  }
}
