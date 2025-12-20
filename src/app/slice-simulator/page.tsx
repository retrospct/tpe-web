import { SliceZone } from '@prismicio/react'
import { SliceSimulator, SliceSimulatorParams, getSlices } from '@slicemachine/adapter-next/simulator'

import { components } from '@/slices'

export default async function SliceSimulatorPage(props: SliceSimulatorParams) {
  const searchParams = await props.searchParams;
  const slices = getSlices(searchParams.state)

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
