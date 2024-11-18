import { Metadata } from "next";


export function constructMetaData({
  title = "Vity",
  description = "Decentralized AI Agent Stack",
  image = "/thumbnail.png", // put a thumbnail.png in public folder, resolution 1200x630
  authors = { name: "vity team", url: "https://vity.tech/" },
  creator = "vity team",
  generator = "Next.js",
  publisher = "vity team",
  robots = "index, follow",
}: {
  title?: string;
  description?: string;
  image?: string;
  authors?: { name: string; url: string };
  creator?: string;
  generator?: string;
  publisher?: string;
  robots?: string;
} = {}): Metadata {
  return {
    title,
    description,
    authors,
    creator,
    generator,
    publisher,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@thatsmeadarsh",
      creator: "@thatsmeadarsh",
      creatorId: "@thatsmeadarsh",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/assets/logo/light-logo.png",
          href: "/assets/logo/light-logo.png",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/assets/logo/dark-logo.png",
          href: "/assets/logo/dark-logo.png",
        },
      ],
    },
    metadataBase: new URL("https://vity.tech/"),
    robots,
  };
}