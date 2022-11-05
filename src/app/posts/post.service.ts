import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable()
export class PostService {
    posts: Post[] = [

    ];

    constructor() {}

    addPost(post: Post) {
        this.posts.push(post);
    }

    getPosts () {
        return this.posts;
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