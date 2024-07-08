'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { subscribeAction } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { subscribeFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { ReactNode, useRef, useTransition } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function SubscribeForm({
  placeholder = 'Email',
  cta = 'SIGN UP',
  className
}: {
  placeholder?: string
  cta?: ReactNode
  className?: string
}) {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(subscribeAction, {
    message: ''
  })
  const { pending } = useFormStatus()
  const form = useForm<z.infer<typeof subscribeFormSchema>>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: ''
    }
  })
  const formRef = useRef<HTMLFormElement>(null)

  const submitForm = async (data: z.infer<typeof subscribeFormSchema>) => {
    startTransition(() => {
      const formData = new FormData(formRef.current!)
      formAction(formData || data)
      toast.success('Thank you for subscribing!', {
        description: `We'll periodically send you interesting newsletters.`,
        duration: 8000
      })
    })
  }

  const resetForm = () => {
    if (state?.message !== '' && !state.issues && process.env.NODE_ENV !== 'development') {
      formRef.current?.reset()
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        id="subscribe-form"
        ref={formRef}
        action={(evt) => {
          form.handleSubmit(async (data) => {
            await submitForm(data)
          })
          resetForm()
        }}
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit(async (data) => {
            await submitForm(data)
          })(evt)
          resetForm()
        }}
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
        <Button type="submit" size="md" disabled={pending || isPending}>
          {cta}
          {pending || (isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />)}
        </Button>
      </form>
    </Form>
  )
}
