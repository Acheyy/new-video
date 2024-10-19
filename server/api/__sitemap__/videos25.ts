
export default defineSitemapEventHandler(async () => {
    const videos = await $fetch<ReturnType<typeof asSitemapUrl>>('http://localhost:3030/api/videos?limit=1000&page=25&sitemap=true')
    return [
      ...videos.videos.map(p => asSitemapUrl({
        loc: `/videos/${p.uploadID}`,
        _i18nTransform: true
      }))
    ]
  })
  