import { Routes } from '../packages/prismic-types'

export const routes: Routes = {
  'page': {
    href: '/',
    page: '/[[...page]]',
    root: 'homepage',
  },
  'company_page':{
    href: '/company',
    page: '/company',
  },
  'pricing_page':{
    href: '/pricing',
    page: '/pricing',
  },
  'teams_index':{
    href: '/teams',
    page: '/teams',
  },
  'team':{
    href: '/teams',
    page: '/teams/[...team]',
  },
  'blog_index':{
    href: '/blog',
    page: '/blog',
  },
  'blog_post': {
    href: '/blog',
    page: '/blog/[post]',
  },
  'policy': {
    href: '/privacy',
    page: '/privacy/[[...uid]]',
    root: 'privacy-policy',
  },
}
