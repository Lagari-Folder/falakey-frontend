// src/components/Common/SEO.tsx

import { Helmet } from "react-helmet-async";
import icon from "../../../public/star-icon.svg"; // Your default icon
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // Adjust this path if needed

// 🔍 Localized content for title and description
const localizedContent = {
  en: {
    title: "Falakey | Free Stock Photos",
    description:
      "Discover free high-quality stock photos and creative photography challenges.",
    image: "/icons/star-icon.svg", // You can override per page or use default
  },
  ar: {
    title: "فلكي | صور مجانية عالية الجودة",
    description:
      "اكتشف صورًا مجانية عالية الجودة وتحديات إبداعية في التصوير الفوتوغرافي.",
    image: "/icons/star-icon.svg", // Replace with an Arabic-specific image if desired
  },
};

export type SEOPROPS = {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
};

export default function SEO({
  title,
  description,
  name,
  type,
  image,
}: SEOPROPS) {
  const { local: locale, dir } = useSelector(
    (state: RootState) => state.translation
  );

  const content =
    localizedContent[locale as "en" | "ar"] || localizedContent.en;

  const resolvedTitle = title || content.title;
  const resolvedDescription = description || content.description;
  const resolvedImage = `${window.location.origin}${image || content.image}`;

  const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
  const enUrl = `${window.location.origin}/en${window.location.pathname}`;
  const arUrl = `${window.location.origin}/ar${window.location.pathname}`;

  return (
    <Helmet htmlAttributes={{ lang: locale, dir }}>
      {/* Page Title */}
      <title>{resolvedTitle}</title>

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href={icon} />

      {/* Meta Description */}
      <meta name="description" content={resolvedDescription} />

      {/* Open Graph / Facebook / WhatsApp Tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta
        property="og:locale"
        content={locale === "ar" ? "ar_AR" : "en_US"}
      />
      <meta property="og:site_name" content="Falakey" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:site" content={name || "@falakey"} />

      {/* Hreflang Tags for Multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ar" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
