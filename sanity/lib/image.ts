import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId, dataset });

/** Build a URL for a Sanity image asset. e.g. urlFor(img).width(1600).url() */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
