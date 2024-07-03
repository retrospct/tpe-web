'use server'

import { contactFormSchemaServer } from '@/lib/validations'

export type FormState = {
  message: string
  fields?: Record<string, string | Date | boolean>
  issues?: string[]
}

export async function submitContactAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = contactFormSchemaServer.safeParse(formData)
  console.log('submitted contact form data', parsed)
  // console.log('prevState', prevState)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    console.log('Form error:', parsed.error.flatten().fieldErrors)
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }

  // if (parsed.data.email.includes('a')) {
  //   console.log('parsed.data.email.includes a', parsed.data.email)
  //   return {
  //     message: 'Invalid email',
  //     fields: parsed.data
  //   }
  // }

  return { message: `Thank you for contacting us, we'll get back to you as soon as possible.` }
}
