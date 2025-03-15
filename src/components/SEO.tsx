
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "/lovable-uploads/98b9f8d6-0299-4b8f-befa-8b0cbb37c698.png",
  keywords 
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const fullTitle = `${title} | IntelliAI Labs`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Add structured data for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "IntelliAI Labs",
          "url": siteUrl,
          "logo": `${siteUrl}/lovable-uploads/98b9f8d6-0299-4b8f-befa-8b0cbb37c698.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-332-855-6537",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://facebook.com",
            "https://x.com/intelliailabs",
            "https://instagram.com/intelliailabs",
            "https://linkedin.com/intelliailabs",
            "https://youtube.com/intelliailabs"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
