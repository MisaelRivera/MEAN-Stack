import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  providers: [PostService],
})
export class PostCreateComponent implements OnInit {
    content = '';
    title = '';
    @Output() newPostEvent = new EventEmitter<Post>();

    constructor(private posts: PostService) { }

    ngOnInit(): void {
    }

    onPostCreated() {
		let newId = 1;
		const lastPost: Post | undefined = this.posts.getLastAddedPost();
		if (lastPost) newId = lastPost.id + 1;
		this.newPostEvent.emit(new Post(newId, this.title, this.content));
    }

}
