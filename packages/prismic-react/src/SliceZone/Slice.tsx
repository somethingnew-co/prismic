/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { PrismicSlice } from '@stnew/prismic-types'

interface SliceProps {
  data: PrismicSlice
  slice?: React.ReactType | Promise<any>
}

export const Slice: React.FC<SliceProps> = ({ slice, data, ...rest }: SliceProps) => {
  if (!slice) return null

  if (Promise.resolve(slice) === slice) {
    return <DynamicSlice component={slice} {...data} {...rest} />
  }

  const Component = slice as React.ReactType

  // TypeScript complains about call signatures
  return <Component {...data} {...rest} />
}

interface DynamicSliceProps {
  component: Promise<any>
}

/**
 * Dynamically load components via import(), which returns a Promise
 */
const DynamicSlice: React.FC<DynamicSliceProps> = ({ component, ...props }: DynamicSliceProps) => {
  // Set the slice component as state because it's ansynchronous
  const [Component, setComponent] = useState<JSX.Element | null>(null)

  const componentIsMounted = useRef<boolean>(true)

  // This hook runs on mount or if slices update
  useEffect(() => {
    async function getSliceComponent(component: Promise<any>): Promise<void> {
      try {
      // If slice component is an import, await for Promise resolution
        const module = await component

        let SliceComponent: React.ReactType

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

        if (componentIsMounted.current) {
          setComponent(() => <SliceComponent { ...props} />)
        }

      } catch (error) {
        setComponent(null)
        throw Error(error)
      }
    }

    getSliceComponent(component)

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return Component
}
