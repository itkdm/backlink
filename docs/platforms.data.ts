import { createContentLoader } from 'vitepress'
import { parsePlatformPages, searchableText } from './.vitepress/data/platform-records'

export default createContentLoader('platform-records/*.md', {
  includeSrc: true,
  transform(pages) {
    return parsePlatformPages(pages).map(({ record, body }) => ({
      ...record,
      searchText: {
        zh: searchableText(body.zh),
        en: searchableText(body.en)
      }
    }))
  }
})
