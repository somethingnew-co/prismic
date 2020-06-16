import React, { ReactNode, useState, useEffect } from 'react'
import { usePrismic } from '..'
import { PrismicSlice } from '@stnew/prismic-types'

interface SliceProps {
  data: PrismicSlice;
  children?: ReactNode;
}

export function Slice({ data, ...rest }: SliceProps): JSX.Element | null {
  // Set the slice component as state because it might be ansynchronous
  const [Component, setComponent] = useState<JSX.Element | null>(null)
  const { slices } = usePrismic()
  const { slice_type } = data

  // This hook runs on mount or if slices update
  useEffect(() => {
    async function getSliceComponent(slice: ((props: any) => JSX.Element) | Promise<any>): Promise<void> {
      // If slice component is an import, await for Promise resolution
      const module = await slice

      let SliceComponent: ((props: any) => JSX.Element)

      if (module.default) {
        // Check first if module is default export...
        SliceComponent = module.default
      } else if (module) {
        // ...otherwise use named export...
        SliceComponent = module
      } else {
        // ...and bail if we can't find an export
        return
      }

      if (SliceComponent) {
        // This check is to support SSR dynamic components, i.e. next/dynamic
        if (typeof(SliceComponent) === 'function') {
          // eslint-disable-next-line new-cap
          setComponent(() => SliceComponent({ ...data, ...rest }))
        } else {
          setComponent(() => <SliceComponent {...data} {...rest} />)
        }
      }
    }

    // Check to see if slice exists in slice dictionary
    if (slices && slices.hasOwnProperty(slice_type)) {
      getSliceComponent(slices[slice_type])
    }
  }, [data, rest, slices, slice_type])

  return Component
}
