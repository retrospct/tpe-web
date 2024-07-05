'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { contactFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, XIcon } from 'lucide-react'
import { useRef, useTransition } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { submitContactAction } from '../../app/actions'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(submitContactAction, {
    message: ''
  })
  const { pending } = useFormStatus()
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      name: '',
      // lastName: '',
      phone: '',
      eventDate: undefined,
      comments: '',
      referral: '',
      newsletter: false
      // ...(state?.fields ?? {}),
    }
  })
  const formRef = useRef<HTMLFormElement>(null)

  const submitForm = async (data: z.infer<typeof contactFormSchema>) => {
    startTransition(() => {
      const formData = new FormData(formRef.current!)
      formData.set('newsletter', data?.newsletter ? data.newsletter.toString() : 'false')
      data?.eventDate && formData.set('eventDate', data.eventDate.toISOString())
      formAction(formData)
      resetForm()
      toast.success('Thank you for contacting Two Perfect Events!', {
        description: `We will get back to you as soon as possible.`,
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
        id="contact-form"
        ref={formRef}
        // action={onSubmit}
        action={(evt) => {
          form.handleSubmit(async (data) => {
            await submitForm(data)
          })
        }}
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit(async (data) => {
            await submitForm(data)
          })(evt)
        }}
        className="my-11 w-full max-w-md space-y-4 px-2 text-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email*" {...field} />
              </FormControl>
              {/* <FormDescription>This is your email address</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex w-full justify-between gap-4">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="flex w-full justify-between gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative w-1/2">
                <FormLabel hidden>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="relative flex w-1/2 flex-col">
                <FormLabel hidden>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        size="md"
                        className={cn(
                          'h-11 bg-background px-3 text-left text-lg font-normal text-primary',
                          !field.value && 'text-secondary'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Event Date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      fromYear={new Date().getFullYear()}
                      // toYear={new Date().getFullYear() + 10}
                      fromMonth={new Date()}
                      defaultMonth={field.value ?? new Date()}
                      // captionLayout="dropdown-buttons"
                      footer={
                        <div className="pt-2 text-center">
                          <Button
                            variant="link"
                            size="sm"
                            className="text-lg font-medium italic text-primary"
                            onClick={() => form.setValue('eventDate', undefined)}
                          >
                            RESET
                          </Button>
                        </div>
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>What is your event vision?</FormLabel>
              <FormControl>
                <Textarea placeholder="What is your event vision?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>How did you hear about us?</FormLabel>
              <FormControl>
                <Input placeholder="How did you hear about us?" {...field} />
                {/* <Textarea placeholder="How did you hear about us?" className="resize-none" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 p-4 text-primary">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Join our email list for tips, tricks, and all things TPE!</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="italic" disabled={pending || isPending}>
          SUBMIT
          {pending || (isPending && <Loader2 className="ml-2 h-6 w-6 animate-spin" />)}
        </Button>
        {/* {state?.message !== '' && !state.issues && <div className="text-balance text-primary">{state.message}</div>} */}
        {state?.issues && (
          <div className="text-primary">
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <XIcon fill="var(--primary)" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Form>
  )
}
