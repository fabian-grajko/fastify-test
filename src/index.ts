import fastify, { FastifyPluginCallback, RawServerDefault } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { z } from 'zod';

import {
  jsonSchemaTransform,
  createJsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { postRouter } from './context';

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

export type FastifyRouter = FastifyPluginCallback<Record<never, never>, RawServerDefault, ZodTypeProvider>;

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
});

app.after(() => {
  // app.register()
  postRouter.createRouter(app);
});

async function run() {
  await app.ready();

  await app.listen({
    port: 4949,
  });

  console.log(`Documentation running at http://localhost:4949/documentation`);
}

run();