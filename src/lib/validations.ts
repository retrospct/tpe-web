import { z } from 'zod'

const phoneValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required.' }).max(100).email(),
  name: z.string().min(1, { message: 'Full name is required.' }).max(120),
  // lastName: z.string().min(1, { message: 'Last name is required.' }).max(50),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters please.' })
    .regex(phoneValidation, { message: 'Invalid phone number' }),
  eventDate: z.date().optional(),
  comments: z.string().max(1000, { message: 'Reply must not be longer than 1000 characters please.' }).optional(),
  referral: z.string().max(80, { message: 'Reply must not be longer than 80 characters please.' }).optional(),
  // newsletter: z.string().default('false').optional()
  newsletter: z.boolean().default(false).optional()
})

export const contactFormSchemaServer = z.object({
  email: z.string().min(1, { message: 'Email address is required.' }).max(100).email(),
  name: z.string().min(1, { message: 'Full name is required.' }).max(120),
  // lastName: z.string().min(1, { message: 'Last name is required.' }).max(50),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters please.' })
    .regex(phoneValidation, { message: 'Invalid phone number' }),
  eventDate: z.string().datetime().optional(),
  comments: z.string().max(1000, { message: 'Reply must not be longer than 1000 characters please.' }).optional(),
  referral: z.string().max(80, { message: 'Reply must not be longer than 80 characters please.' }).optional(),
  // newsletter: z.string().default('false').optional()
  newsletter: z.string().or(z.boolean()).default(false).optional()
})
