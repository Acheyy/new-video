
export default defineSitemapEventHandler(async () => {
    const actors = await $fetch<ReturnType<typeof asSitemapUrl>>('https://sexkbj.tv/api/actors?limit=999&sitemap=true')
    return [
      ...actors.actors.map(p => asSitemapUrl({
        loc: `/bj-list/${p.name}`,
        _i18nTransform: true
      }))
    ]
  })
  