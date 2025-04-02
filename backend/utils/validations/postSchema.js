import z from "zod";

export const postSchema = z.object({
  title: z.string({ message: "Title should be a string" }),
});