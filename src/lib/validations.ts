import { z } from 'zod'

const phoneValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: 'Enter a valid email address' }).max(256).email(),
  firstName: z.string().min(1, { message: 'Your name is required' }).max(256),
  lastName: z.string().min(1, { message: 'Your last name is required' }).max(256),
  phone: z
    .string()
    .min(1, { message: 'Enter a valid phone number' })
    .max(20, { message: 'Phone number is too long' })
    .regex(phoneValidation, { message: 'Enter a valid phone number' }),
  eventDate: z.coerce.date().optional(),
  comments: z.string().max(2000, { message: 'Reply must not be longer than 2000 characters' }).optional(),
  referral: z
    .string({ required_error: 'A selection is required' })
    .min(1, { message: 'A selection is required' })
    .max(256),
  newsletter: z.string().or(z.boolean()).default(false).optional()
  // cfTurnstileResponse: z.string().optional()
})

export const subscribeFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Enter a valid email address' })
    .max(256)
    .email()
    .describe('Email address provided by the user')
  // email: z.string().min(1, { message: 'Email address is required.' }).max(256).email()
})
