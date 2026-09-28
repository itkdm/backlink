import { loadPlatformPages } from '../.vitepress/data/platform-records'

export default {
  watch: ['../platform-records/*.md'],
  async paths() {
    const platforms = await loadPlatformPages()
    return platforms.map(({ record, body }) => ({
      params: {
        id: record.id,
        seoTitle: record.seo.title.zh,
        seoDescription: record.seo.description.zh
      },
      content: body.zh
    }))
  }
}
