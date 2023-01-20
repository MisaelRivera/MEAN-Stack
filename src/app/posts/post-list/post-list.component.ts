import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
	downArrowPath = 'assets/img/arrow-down-icon.svg';
	posts: Post[] = [];
	private postsSub: Subscription = new Subscription();

	constructor(public postsService: PostService) { }

	ngOnInit(): void {
		this.postsService.getPosts();
		this.postsSub = this.postsService.getPostUpdateListener()
		.subscribe((posts: Post[]) => {
			this.posts = posts;
		});
	}

	ngOnDestroy(): void {
		this.postsSub.unsubscribe();
	}

	onShowContent (event: Event) {
		const content = (<HTMLElement>event.currentTarget).children[1];
		content.classList.toggle('hidden');
	}

}
