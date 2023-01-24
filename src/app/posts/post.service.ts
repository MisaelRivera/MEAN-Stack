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

    deletePost (id: number) {
        this.http.delete<{message: string, posts: Post[]}>(`http://localhost:3000/api/posts/${id}`)
            .subscribe((responseData) => {
                this.posts = responseData.posts;
                this.postsUpdated.next([...this.posts]);
                console.log(responseData.message);
            });
    }

    getPost(id: string) {
        return <Post>{...this.posts.find(p => p.id === parseInt(id))};
    }

    updatePost (id: string, title: string, content: string) {
        const post = {id, title, content};
        this.http
        .put<{ message: string }>(`http://localhost:3000/api/posts/${id}`, post)
        .subscribe(responseData => console.log(responseData.message));
    }

    getLastAddedPost () {
        return this.posts[this.posts.length - 1];
    }
}