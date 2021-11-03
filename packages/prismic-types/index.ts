export interface PrismicLink {
  link_type: 'Document' | 'Web' | 'Media' | 'Any'
  url?: string
  id?: string
  lang?: string
  slug?: string
  tags?: string[]
  type?: string
  uid?: string
  isBroken?: boolean
  target?: string
  data?: any
}

export type PrismicDoc = PrismicLink

export interface PrismicSlice {
  slice_type: string
  slice_label: string | null
  primary: any
  items: any[]
}

export type PrismicDropdown = string

export type PrismicKeyText = string

export interface PrismicDocument {
  [key: string]: any
  body: PrismicSlice[]
}

export interface PrismicText {
  type: string
  text: string
  spans: any[]
}

export interface LinkResolver {
  (doc: PrismicLink): string
}

export interface Route {
  href: string
  page?: string
  root?: string
}

export interface Routes {
  [key: string]: Route
}

export interface Resolver {
  (routes: Routes): LinkResolver
}

export type PrismicBoolean = boolean

export type PrismicDate = string

export type PrismicTimestamp = string

export type PrismicSelect = string

export type PrismicGeopoint = { latitude: number, longitude: number }

export type PrismicColor = string

export type PrismicNumber = number

export type PrismicImage = {
  alt: string | null
  copyright: string | null
  dimensions: { width: number, height: number }
  url: string
}

export type PrismicIntegrationField<BlobType> = {
  id: string
  title: string
  description: string
  image_url: string
  last_update: number
  blob: BlobType
}

export type PrismicIntegrationFields<BlobType> = PrismicIntegrationField<BlobType>[]

export type PrismicIntegrationFieldAPIResponse<BlobType> = {
  results_size: number
  results: PrismicIntegrationFields<BlobType>
}
