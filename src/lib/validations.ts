import { z } from 'zod'

const phoneValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

/**
 * Matches anything that looks like a link: a scheme, a www. prefix, or a bare
 * domain with a common TLD. Bots push links through the contact form so the
 * notice email lands in Leah's inbox as phishing. Real clients can share links
 * once we reply.
 */
const linkPattern =
  /(https?:\/\/|www\.|\b[\w-]+\.(com|net|org|io|co|ru|xyz|info|biz|site|online|top|shop|club|link)\b)/i
const NO_LINKS_MESSAGE = 'Please leave links out of your message. You can share them when we reply.'
const noLinks = (value: string | undefined) => !value || !linkPattern.test(value)

export const contactFormSchema = z.object({
  email: z.string().min(1, { message: 'Enter a valid email address' }).max(256).email(),
  firstName: z
    .string()
    .min(1, { message: 'Your name is required' })
    .max(256)
    .refine(noLinks, { message: NO_LINKS_MESSAGE }),
  lastName: z
    .string()
    .min(1, { message: 'Your last name is required' })
    .max(256)
    .refine(noLinks, { message: NO_LINKS_MESSAGE }),
  phone: z
    .string()
    .min(1, { message: 'Enter a valid phone number' })
    .max(20, { message: 'Phone number is too long' })
    .regex(phoneValidation, { message: 'Enter a valid phone number' }),
  eventDate: z.coerce.date().optional(),
  comments: z
    .string()
    .max(2000, { message: 'Reply must not be longer than 2000 characters' })
    .refine(noLinks, { message: NO_LINKS_MESSAGE })
    .optional(),
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
