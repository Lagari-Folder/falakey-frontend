import { Helmet } from "react-helmet-async";
import icon from "/star-icon.svg"; // public/star-icon.svg
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const localizedContent = {
  en: {
    title: "Falakey | Free Stock Photos",
    description:
      "Discover free high-quality stock photos and creative photography challenges.",
    image: "/icons/star-icon.svg",
  },
  ar: {
    title: "فلكي | صور مجانية عالية الجودة",
    description:
      "اكتشف صورًا مجانية عالية الجودة وتحديات إبداعية في التصوير الفوتوغرافي.",
    image: "/icons/star-icon.svg",
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

  // Avoid SSR crashes (window is undefined during SSR)
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  const resolvedTitle = title || content.title;
  const resolvedDescription = description || content.description;
  const resolvedImage = `${origin}${image || content.image}`;

  const canonicalUrl = `${origin}${path}`;
  const enUrl = `${origin}/en${path}`;
  const arUrl = `${origin}/ar${path}`;

  return (
    <Helmet htmlAttributes={{ lang: locale, dir }}>
      <title>{resolvedTitle}</title>

      {/* favicon */}
      <link rel="icon" type="image/svg+xml" href={icon} />

      <meta name="description" content={resolvedDescription} />

      {/* Open Graph */}
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

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:site" content={name || "@falakey"} />

      {/* Multilingual links */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ar" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
