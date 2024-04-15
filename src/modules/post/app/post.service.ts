import { Post } from '../data/post.model';
import { IPostRepository } from '../data/post.repository';

export interface IPostService {
  createPost(title: string, description: string): Post;
  getPostById(id: string): Post | null;
}

export class PostService implements IPostService {
  constructor(private readonly postRepository: IPostRepository) {}

  createPost(title: string, description: string): Post {
    return this.postRepository.createPost(title, description);
  }

  getPostById(id: string): Post | null {
    return this.postRepository.getPostById(id);
  }
}