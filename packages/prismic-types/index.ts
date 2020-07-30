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

export type Routes = {
  [key: string]: {
    href: string
    page?: string
    root?: string
  }
}

export interface Resolver {
  (routes: Routes): LinkResolver
}
