import React from 'react'
import { usePrismic } from '..'
import { Slice } from './Slice'
import { PrismicSlice } from '@stnew/prismic-types'
import { SliceMap, Slice as SliceType } from '../types'

function SliceZone({ data, slices = {}, ...rest }: {
  data: PrismicSlice[]
  slices?: { [key: string]: SliceType }
}): JSX.Element | null {
  const { sliceMap } = usePrismic()

  if (!data || !sliceMap) return null

  const mergedMap: SliceMap = new Map([
    ...sliceMap,
    ...Object.entries(slices),
  ])

  return (
    <React.Fragment>
      {data.map((item, index) => {
        if (mergedMap.has(item.slice_type)) {
          const slice = mergedMap.get(item.slice_type)
          return <Slice slice={slice} key={index} data={item} {...rest} />
        }
      })}
    </React.Fragment>
  )
}

export default SliceZone
