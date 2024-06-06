import { Heading, Text } from '@/components'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Content, asText, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps): JSX.Element => {
  const background = isFilled.select(slice.primary.background) ? `bg-${slice.primary.background}` : 'bg-foreground'
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('flex w-full flex-col items-center justify-center', background)}
    >
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-5xl flex-col items-center justify-center px-6 py-16 lg:py-24">
          <Heading richText={slice.primary.title} className="mb-14 text-center text-3xl lg:text-4xl" accents />
          <div
            className={cn(
              'grid w-full grid-cols-1 gap-0 lg:gap-9',
              isFilled.group(slice.primary.first_group) &&
                isFilled.group(slice.primary.second_group) &&
                'lg:grid-cols-2'
            )}
          >
            {isFilled.group(slice.primary.first_group) && (
              <Accordion type="single" collapsible className="w-full">
                {slice.primary.first_group.map((item, i) => (
                  <AccordionItem key={JSON.stringify(item.question)} value={`faq-1-${i}`}>
                    <AccordionTrigger>{asText(item.question)}</AccordionTrigger>
                    <AccordionContent>
                      <Text richText={item.answer} size="md" />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            {isFilled.group(slice.primary.second_group) && (
              <Accordion type="single" collapsible className="w-full">
                {slice.primary.second_group.map((item, i) => (
                  <AccordionItem
                    key={JSON.stringify(item.question)}
                    value={`faq-2-${i}`}
                    className="first:border-t-0 lg:first:border-t-2"
                  >
                    <AccordionTrigger>{asText(item.question)}</AccordionTrigger>
                    <AccordionContent>
                      <Text richText={item.answer} size="md" />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Faq
