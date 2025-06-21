function share_post(
  platform: "facebook" | "pinterest" | "twitter" | "email" | "whatsapp",
  url: string
) {
  if (!platform || !url) {
    return;
  }

  if (platform == "facebook") {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  } else if (platform === "pinterest") {
    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&media=&description=Check this out!`;
    window.open(pinterestUrl, "_blank");
  } else if (platform === "twitter") {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=Check this out!`;
    window.open(twitterUrl, "_blank");
  } else if (platform === "email") {
    const emailSubject = encodeURIComponent("Check this out!");
    const emailBody = encodeURIComponent(
      `I found this interesting link: ${url}`
    );
    const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    window.open(emailUrl, "_blank");
  } else if (platform === "whatsapp") {
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      url
    )}`;
    window.open(whatsappUrl, "_blank");
  }
}

export default share_post;
