
export default defineSitemapEventHandler(async () => {
    const actors = await $fetch<ReturnType<typeof asSitemapUrl>>('https://kbjfree.tv/api/actors?limit=999&sitemap=true')
    return [
      ...actors.actors.map(p => asSitemapUrl({
        loc: `/all-girls/${p.name}`,
        _i18nTransform: true
      }))
    ]
  })
  