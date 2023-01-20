import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {


    constructor(public posts: PostService) { }

    ngOnInit(): void {
    }

    onPostCreated(form: NgForm) {
      if (form.invalid) return;
      let newId = 1;
      const lastPost: Post | undefined = this.posts.getLastAddedPost();
      if (lastPost) newId = lastPost.id + 1;
      this.posts.addPost(new Post(newId, form.value.title, form.value.content));
      form.resetForm();
    }

}
