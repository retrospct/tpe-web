'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
// import { addMonths, isSameMonth } from 'date-fns';

const phoneValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required.' }).max(100).email(),
  firstName: z.string().min(1, { message: 'First name is required.' }).max(50),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(50),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters please.' })
    .regex(phoneValidation, { message: 'Invalid phone number' }),
  // eventDate: z.date().optional(),
  // eventDate: z.date().optional(),
  eventDate: z.date().optional(),
  comments: z.string().max(240, { message: 'Reply must not be longer than 240 characters please.' }).optional(),
  referral: z.string().max(80, { message: 'Reply must not be longer than 80 characters please.' }).optional(),
  newsletter: z.boolean().default(false).optional()
})

export function ContactForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      eventDate: undefined,
      comments: '',
      referral: '',
      newsletter: false
    }
  })
  // const today = new Date();
  // const nextMonth = addMonths(new Date(), 1);
  // const [month, setMonth] = useState<Date>(nextMonth);

  // const footer = (
  //   <button
  //     disabled={isSameMonth(today, month)}
  //     onClick={() => setMonth(today)}
  //   >
  //     Today
  //   </button>
  // );

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast.message('Form has been submitted', {
      description: JSON.stringify(values, null, 2)
      // description: (
      //   <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
      //     <code>{JSON.stringify(values, null, 2)}</code>
      //   </pre>
      // )
    })
  }

  return (
    <Form {...form}>
      <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="my-11 space-y-4 px-2 text-center">
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
        <div className="flex w-full justify-between gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
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
          {/* <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Event Date</FormLabel>
                <FormControl>
                  <Input placeholder="Event Date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                          'h-11 bg-foreground px-3 text-left text-lg font-normal text-primary',
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
                      fromMonth={new Date()}
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
              <FormLabel hidden>How did you hear about TPE?</FormLabel>
              <FormControl>
                <Input placeholder="How did you hear about TPE?" {...field} />
                {/* <Textarea placeholder="How did you hear about TPE?" className="resize-none" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 border p-4 text-red">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Join our email list for tips, tricks, and all things TPE!</FormLabel>
                {/* <FormDescription>
                  You can manage your mobile notifications in the <Link href="/">mobile settings</Link> page.
                </FormDescription> */}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="italic">
          SUBMIT
        </Button>
      </form>
    </Form>
  )
}
