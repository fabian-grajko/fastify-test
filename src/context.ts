import { PostRouter } from './modules/post/api/post.router';
import { PostService } from './modules/post/app/post.service';
import { PostRepository } from './modules/post/data/post.repository';

const postRepository = new PostRepository();

const postService = new PostService(postRepository);
const postRouter = new PostRouter(postService);

export { postRouter };