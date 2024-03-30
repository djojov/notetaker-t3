import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const folderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.folder.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.folder.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  createInitial: protectedProcedure
    .input(
      z.object({
        title: z.string().optional().default("Notes"),
        id: z.string().default("1"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.folder.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
