import { useEffect } from "react";

interface SeoProps {
  title?: string; // Page title
  description?: string; // Meta description
  keywords?: string; // Meta keywords
  imageUrl?: string; // Social sharing image URL (for Open Graph)
  url?: string; // Canonical URL
}

const useSeo = ({
  title,
  description,
  keywords,
  imageUrl,
  url,
}: SeoProps) => {
  useEffect(() => {
    // Update the document title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    // Apply meta tags dynamically
    metaTags.forEach(({ name, property, content }) => {
      if (!content) return;

      const existingMeta =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${property}"]`);

      if (existingMeta) {
        existingMeta.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Clean up unused meta tags on component unmount
    return () => {
      metaTags.forEach(({ name, property }) => {
        const existingMeta =
          document.querySelector(`meta[name="${name}"]`) ||
          document.querySelector(`meta[property="${property}"]`);
        if (existingMeta) {
          document.head.removeChild(existingMeta);
        }
      });
    };
  }, [title, description, keywords, imageUrl, url]);
};

export default useSeo;
