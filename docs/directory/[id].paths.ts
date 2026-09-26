import { directoryLinks } from '../.vitepress/data/links'

export default {
  watch: ['../.vitepress/data/links.ts'],
  paths() {
    return directoryLinks.map((link) => ({ params: { id: link.id } }))
  }
}
