import { Post } from './post.model';

export interface IPostRepository {
  createPost(title: string, description: string): Post;
  getPostById(id: string): Post | null;
};

export class PostRepository implements IPostRepository {
  private posts = new Map<string, Post>();

  createPost(title: string, description: string): Post {
    const uuid = 'adfb0623-86cd-4770-ac97-e079a343ef8b';
    const post = new Post(uuid, title, description);
    this.posts.set(uuid, post);

    return post;
  }

  getPostById(id: string): Post | null {
    return this.posts.get(id) ?? null;
  }
};
