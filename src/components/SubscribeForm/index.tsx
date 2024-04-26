'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .max(100)
    .email()
    .describe('Email address provided by the user.')
})

export function SubscribeForm({
  placeholder = 'Email',
  cta = 'SIGN UP',
  className
}: {
  placeholder?: string
  cta?: ReactNode
  className?: string
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast.message('Form has been submitted', {
      description: JSON.stringify(values, null, 2)
    })
  }

  return (
    <Form {...form}>
      <form
        id="subscribe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('my-2 flex items-start justify-center gap-2', className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Email</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} className="h-9" {...field} />
              </FormControl>
              {/* <FormDescription>This is your email address</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="md">
          {cta}
        </Button>
      </form>
    </Form>
  )
}
