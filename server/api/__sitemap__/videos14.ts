
export default defineSitemapEventHandler(async () => {
    const videos = await $fetch<ReturnType<typeof asSitemapUrl>>('https://kbjfree.tv/api/videos?limit=1000&page=14&sitemap=true')
    return [
      ...videos.videos.map(p => asSitemapUrl({
        loc: `/videos/${p.uploadID}`,
        _i18nTransform: true
      }))
    ]
  })
  