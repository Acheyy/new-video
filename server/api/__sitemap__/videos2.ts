
export default defineSitemapEventHandler(async () => {
    const videos = await $fetch<ReturnType<typeof asSitemapUrl>>('https://sexkbj.tv/api/videos?limit=1000&page=2&sitemap=true')
    return [
      ...videos.videos.map(p => asSitemapUrl({
        loc: `/videos/${p.uploadID}`,
        _i18nTransform: true
      }))
    ]
  })
  