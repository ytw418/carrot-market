export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

type Variants = "avatar" | "product" | "list" | "public";

export function makeImageUrl(imageId: string, variant: Variants) {
  return `https://imagedelivery.net/OvWZrAz6J6K7n9LKUH5pKw/${imageId}/${variant}`;
}
