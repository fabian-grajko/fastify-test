import * as z from 'zod';

export const POST_SCHEMA = z.object({
  title: z.string().max(32),
  description: z.string().max(256),
});

export const POST_DTO = z.object({
  id: z.string().uuid(),
  title: z.string().max(32),
  description: z.string().max(256),
});

export const GET_POST_PARAMS = z.object({ id: z.string().uuid() });