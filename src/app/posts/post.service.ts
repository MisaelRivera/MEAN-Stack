import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient) {}

    addPost(post: Post) {
        this.http
            .post<{message: string}>('http://localhost:3000/api/posts', post)
            .subscribe(responseData => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
        });
    }

    getPosts () {
        this.http.get<{message:string, posts:Post[]}>(`http://localhost:3000/api/posts`)
        .subscribe((postsData) => {
            this.posts = postsData.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener () {
        return this.postsUpdated.asObservable();
    }

    getPost(id: number): Post | undefined {
        const filteredPosts = this.posts.filter(post => post.id === id);
        if (filteredPosts.length > 0) {
            return filteredPosts[0];
        }
        return undefined;
    }

    getLastAddedPost () {
        return this.posts[this.posts.length - 1];
    }
}