import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
	downArrowPath = 'assets/img/arrow-down-icon.svg';
	@Input()
	posts: Post[] = [
		
	];

	constructor() { }

	ngOnInit(): void {
	}

	onShowContent (event: Event) {
		const content = (<HTMLElement>event.currentTarget).children[1];
		content.classList.toggle('hidden');
	}

}
