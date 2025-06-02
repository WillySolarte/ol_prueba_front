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

export const businessmanSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  telefono: z.string(),
  correo: z.string(),
  fechaRegistro: z.string(),
  cantidadEstablecimientos: z.number(),
  estado: z.boolean()
})
export const businessmanEditGetDataSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  telefono: z.string().optional(),
  correo: z.string().optional(),
  fechaRegistro: z.string(),
  estado: z.boolean(),
  municipioId: z.number(),
})



export const municipalitySchema = z.object({
  id: z.number(),
  nombre: z.string(),
})
export const municipalitiesSchema = z.array(municipalitySchema);
export type TMunicipalities= z.infer<typeof municipalitiesSchema>;

export type TBusinessmanForm = Omit<z.infer<typeof businessmanEditGetDataSchema>, 'id'>;

export type TBusinessmanEditGetData = z.infer<typeof businessmanEditGetDataSchema>;



export type TBusinessman = z.infer<typeof businessmanSchema>;

export const businessmansSchema = z.array(businessmanSchema);

export const dataBusinessmanSchema = z.object({
  comerciantes: businessmansSchema,
  totalPages: z.number(),
})

export type TPaginationData = z.infer<typeof dataBusinessmanSchema>;

export const bussinesmansResponseSchema = createDataResponseSchema(dataBusinessmanSchema);

export const municipalitiesResponseSchema = createDataResponseSchema(municipalitiesSchema);

export const userActiveSchema = createDataResponseSchema(userSchema);

export const businesmanChangeStateResponseSchema = createDataResponseSchema(z.boolean());

export const deleteBusinesmannResponseSchema = createDataResponseSchema(z.null());

export const editBusinesmannResponseSchema = createDataResponseSchema(z.null());

export const createBusinesmannResponseSchema = createDataResponseSchema(z.null());

export const buisnessmanToEditSchema = createDataResponseSchema(businessmanEditGetDataSchema);