import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ folderId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          folderId: input.folderId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        folderId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          title: input.title,
          folderId: input.folderId,
          content: input.content,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
