import { loadPlatformPages } from '../../.vitepress/data/platform-records'

export default {
  watch: ['../../platform-records/*.md'],
  async paths() {
    const platforms = await loadPlatformPages()
    return platforms.map(({ record, body }) => ({
      params: {
        id: record.id,
        seoTitle: record.seo.title.en,
        seoDescription: record.seo.description.en
      },
      content: body.en
    }))
  }
}
