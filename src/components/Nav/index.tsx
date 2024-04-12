import { createClient } from '@/prismicio'

import NavItems from './NavItems'
import NavLogo from './NavLogo'

export default async function Nav() {
  const client = createClient()
  const navigation = await client.getByUID('nav', 'main-nav')

  return (
    <header className="bg-almond">
      <NavLogo />
      <NavItems navigation={navigation} />
    </header>
  )
}
