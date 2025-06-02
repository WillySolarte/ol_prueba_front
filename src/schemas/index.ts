import { z } from 'zod';

export const userLoginResponseSchema = z.object({
    access_token: z.string()
})
export type TUserLoginResponse = z.infer<typeof userLoginResponseSchema>;



export const createDataResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema,
  });
};

export const userSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  correo: z.string(),
  rol: z.string(),
});


export const userActiveSchema = createDataResponseSchema(userSchema);