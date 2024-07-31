import { createClient } from '@/prismicio'

import { cn } from '@/lib/utils'
import { isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { SubscribeForm } from '../SubscribeForm'
import { Text } from '../Text'
import NavItems from './NavItems'
import NavLogo from './NavLogo'

export default async function Footer() {
  const client = createClient()
  const navigation = await client.getByUID('footer', 'main-footer')

  return (
    <footer className="mb-10 mt-1 lg:my-16">
      <NavLogo />
      <NavItems navigation={navigation} />

      {isFilled.richText(navigation.data.newsletter_cta) && isFilled.richText(navigation.data.newsletter_text) && (
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center px-6 text-center text-red lg:px-12">
          <SubscribeForm
            cta={<PrismicRichText field={navigation.data.newsletter_cta} />}
            placeholder={
              isFilled.keyText(navigation.data.newsletter_input) ? navigation.data.newsletter_input : undefined
            }
          />
          <div className="max-w-72 font-light">
            <PrismicRichText field={navigation.data.newsletter_text} />
          </div>
        </div>
      )}

      {navigation.data?.statements?.length > 0 && (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          {navigation.data.statements.map(
            (statement, i) =>
              isFilled.richText(statement.text) && (
                <Text
                  key={`statement-${i}`}
                  richText={statement.text}
                  size={i === 1 ? 'md' : 'sm'}
                  className={cn(
                    'mt-6 text-center text-primary lg:text-primary',
                    i === 1 && 'order-first font-medium lg:order-none [&_span]:no-underline'
                  )}
                />
              )
          )}
        </div>
      )}
      {isFilled.richText(navigation.data.copyright) && (
        <div className="mx-auto mt-6 max-w-xs px-6 lg:mt-1 lg:max-w-full lg:px-12">
          <Text richText={navigation.data.copyright} size="xs" className="text-center text-primary lg:text-primary" />
        </div>
      )}
    </footer>
  )
}
