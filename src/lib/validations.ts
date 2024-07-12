import { z } from 'zod'

const phoneValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required.' }).max(256).email(),
  firstName: z.string().min(1, { message: 'First name is required.' }).max(256),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(256),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters please.' })
    .regex(phoneValidation, { message: 'Invalid phone number' }),
  eventDate: z.coerce.date().optional(),
  comments: z.string().max(2000, { message: 'Reply must not be longer than 2000 characters please.' }).optional(),
  referral: z.string().max(256, { message: 'Reply must not be longer than 256 characters please.' }).optional(),
  newsletter: z.string().or(z.boolean()).default(false).optional()
  // cfTurnstileResponse: z.string().optional()
})

export const subscribeFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .max(256)
    .email()
    .describe('Email address provided by the user.')
  // email: z.string().min(1, { message: 'Email address is required.' }).max(256).email()
})
