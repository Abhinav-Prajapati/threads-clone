import * as z from 'zod'

export const userValidationSchema = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().nonempty().min(3).max(50),
    userName: z.string().nonempty().min(3).max(50),
    bio: z.string().nonempty().min(3).max(1000)
})