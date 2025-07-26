export const config = {
  matcher: ["/:locale/challenge/:slug*"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const userAgent = req.headers.get("user-agent") || "";

  console.log("Middleware triggered for", pathname, "User-Agent:", userAgent);

  // Ignore static files
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    return new Response(null, { status: 404 });
  }

  // Extract locale and slug
  const parts = pathname.split("/");
  const locale = parts[1] || "en";
  const slug = parts[3] || "";
  if (!slug) {
    return new Response(`<h1>No slug found in path: ${pathname}</h1>`, {
      headers: { "content-type": "text/html" },
      status: 400,
    });
  }

  const apiUrl = `https://admin.falakey.com/api/v1/challenges/show/${slug}?locale=${locale}`;
  console.log("Fetching SEO data:", apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch challenge data. Status: ${response.status}`
      );
    }

    const json = await response.json();
    console.log("API Raw JSON:", json);

    const challenge = json.data;
    if (!challenge) {
      throw new Error("Challenge data missing from API response");
    }

    // Show data for debugging
    return new Response(
      `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <title>Debug SEO Data</title>
</head>
<body>
  <h1>Debug SEO Data for slug: ${slug}</h1>
  <p><strong>API URL:</strong> ${apiUrl}</p>
  <pre>${JSON.stringify(challenge, null, 2)}</pre>
</body>
</html>`,
      { headers: { "content-type": "text/html" } }
    );
  } catch (error) {
    console.error("Middleware SEO fetch error:", error);

    // Show error page
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>SEO Debug Error</title></head>
<body>
  <h1>Middleware SEO fetch error</h1>
  <p><strong>API URL:</strong> ${apiUrl}</p>
  <p><strong>Error:</strong> ${error.message}</p>
  <pre>${error.stack}</pre>
</body>
</html>`,
      { headers: { "content-type": "text/html" }, status: 500 }
    );
  }
}
