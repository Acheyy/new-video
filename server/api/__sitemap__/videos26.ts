
export default defineSitemapEventHandler(async () => {
    const videos = await $fetch<ReturnType<typeof asSitemapUrl>>('https://skbj.tv/api/videos?limit=1000&page=26&sitemap=true')
    return [
      ...videos.videos.map(p => asSitemapUrl({
        loc: `/videos/${p.uploadID}`,
        _i18nTransform: true
      }))
    ]
  })
  