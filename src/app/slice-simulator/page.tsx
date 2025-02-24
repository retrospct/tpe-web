import { SliceZone } from '@prismicio/react'
import { SliceSimulator, SliceSimulatorParams, getSlices } from '@slicemachine/adapter-next/simulator'

import { components } from '@/slices'

export default function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  const { state } = await searchParams
  const slices = getSlices(state)

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
