import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = '2gr3dh6t'
const dataset = 'production'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: any) {
  return builder.image(source)
}

export const sanityConfig = {
  projectId,
  dataset,
  useCdn: false,
}
