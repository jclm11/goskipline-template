// Default content (fallback)
const siteData = {
  biz: "GoSkipline",
  phone: "",
  headline: "Websites for Local Businesses — Done in 24 Hours",
  subhead: "No upfront cost. $50/mo. More customers instantly.",
  ctaText: "Get My Site",
  servicesTitle: "What You Get",
  services: ["Mobile optimized", "Google SEO ready", "Fast loading", "Hosting included"],
  pricingTitle: "Simple Pricing",
  pricingText: "$50/month — cancel anytime",
  contactTitle: "Start Today"
};

// Helper: set text
function setText(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
}

// Build services cards
function renderServices(services) {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = "";
  services.forEach((label) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = label;
    grid.appendChild(card);
  });
}

// Read URL parameters
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    biz: params.get("biz")?.trim() || "",
    phone: params.get("phone")?.trim() || ""
  };
}

// Apply URL params into site content
function applyParamsToData(data, params) {
  const biz = params.biz;
  const phone = params.phone;

  // If biz exists, customize copy
  if (biz) {
    data.biz = biz;
    data.headline = `${biz} — Get More Customers This Week`;
    data.subhead = `Fast, clean site for ${biz}. No upfront cost.`;
    data.ctaText = "Contact Us";
    data.contactTitle = `Get ${biz} Online Today`;

    // Example: you can make services more generic per biz
    data.servicesTitle = `What ${biz} Gets`;
  }

  // If phone exists, store it (we’ll use it in submit later)
  if (phone) {
    data.phone = phone;
  }

  return data;
}

// Render whole page
function render(data) {
  setText("headline", data.headline);
  setText("subhead", data.subhead);
  setText("cta", data.ctaText);

  setText("servicesTitle", data.servicesTitle);
  renderServices(data.services);

  setText("pricingTitle", data.pricingTitle);
  setText("pricingText", data.pricingText);

  setText("contactTitle", data.contactTitle);
}

// INIT
const params = getParams();
const finalData = applyParamsToData({ ...siteData }, params);
render(finalData);

// Autofill inputs if URL provided
if (params.biz) document.getElementById("businessInput").value = params.biz;
if (params.phone) document.getElementById("phoneInput").value = params.phone;



// CTA scroll
document.getElementById("cta").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

// Submit behavior
document.getElementById("submitBtn").addEventListener("click", () => {
  const business = document.getElementById("businessInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();

  if (!business || !phone) {
    setText("status", "Enter business + phone.");
    return;
  }

  // If URL included a phone, show it as the “destination”
  const destination = finalData.phone ? ` (goes to ${finalData.phone})` : "";
  setText("status", `Sent. We'll text ${business} at ${phone}.${destination}`);
});
document.getElementById("copyBtn").addEventListener("click", async () => {
  const biz = params.biz || "your business";
  const demoLink = window.location.href;

  const msg =
`Hey — I made a quick demo website for ${biz} so you can see what it would look like live.
Demo: ${demoLink}

If you want, I can finish it + connect your domain in 24 hours. $50/mo, cancel anytime.
Want me to customize it with your services + photos?`;

  try {
    await navigator.clipboard.writeText(msg);
    setText("status", "Copied outreach message ✅");
  } catch {
    setText("status", "Copy failed — your browser blocked clipboard.");
  }
});
