import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  public isCreateMode: boolean = true;
  public editId!:string | null; 
  public post!: Post;

  constructor(
    public postsService: PostService,
    private route: ActivatedRoute) { 
      
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isCreateMode = false;
        this.editId = paramMap.get('postId');
        if (this.editId)
          this.post = this.postsService.getPost(this.editId);
      } else {
        this.isCreateMode = true;
        this.editId = null;
      }
    });
  }

  onPostCreated(form: NgForm) {
    if (form.invalid) return;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        console.log(this.post);
        this.postsService.updatePost(this.post.id.toString(), form.value.title, form.value.content);
      } else {
        let newId = 1;
        const lastPost: Post | undefined = this.postsService.getLastAddedPost();
        if (lastPost) newId = lastPost.id + 1;
        this.postsService.addPost(new Post(newId, form.value.title, form.value.content));
        form.resetForm();
      }
    });
  }

}
