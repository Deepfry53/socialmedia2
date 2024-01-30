import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2,{ message:'To Short'}).max(50,'To Long'),
    username: z.string().min(2,{ message:'To Short'}).max(50,'To Long'),
    email: z.string().email(),
    password: z.string().min(8,{ message:'passwords must be at least 8 character.'}),
  });
  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,{ message:'passwords must be at least 8 character.'}),
  });
  export const PostValidation = z.object({
    caption : z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location : z.string().min(2).max(100),
    tags: z.string(),
  });