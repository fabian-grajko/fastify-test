import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GET_POST_PARAMS, POST_DTO, POST_SCHEMA } from "./post.schema";
import * as z from 'zod';
import { IPostService } from '../app/post.service';

const CREATE_POST_SCHEMA = { body: POST_SCHEMA, response: { 201: POST_DTO } };
const GET_POST_SCHEMA = { params: GET_POST_PARAMS };

export class PostRouter {
  constructor(private readonly postService: IPostService) {}

  createRouter(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/post",
      {
        schema: CREATE_POST_SCHEMA,
      },
      async (req, res) => {
        const { title, description } = req.body;
        const post = this.postService.createPost(title, description);
        return post;
      }
    );

    app.withTypeProvider<ZodTypeProvider>().get(
      "/post/:id",
      {
        schema: GET_POST_SCHEMA,
      },
      async (req, res) => {
        const post = this.postService.getPostById(req.params.id);

        res.statusCode = 201;
        console.log(res.statusCode);
        res.code(201).send(post);
        // return post;
      }
    );
  }
}
