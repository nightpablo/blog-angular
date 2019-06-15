import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public page_title: string;
  public token;
	@Input() posts;
	@Input() identify;
  @Input() url;
  @Output() eliminameElPost = new EventEmitter();

  constructor(
  ) { 
  this.page_title = 'Inicio';
  }
  ngOnInit() {
  }

  deletePost(id:number){
    this.eliminameElPost.emit(""+id);
  }
}
