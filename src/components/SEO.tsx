import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'ВетДом НН - Ветеринар на дом в Нижнем Новгороде',
  description = 'Профессиональный ветеринар на дом в Нижнем Новгороде. Круглосуточная экстренная помощь животным. Опытные врачи, современное оборудование, доступные цены.',
  keywords = 'ветеринар на дом, ветклиника, лечение животных, Нижний Новгород, экстренная ветпомощь, врач для животных',
  image = '/img/vet-home-service.jpg',
  url = 'https://vetdom-nn.ru',
  type = 'website'
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="ВетДом НН" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="ru" />
      <meta name="author" content="ВетДом НН" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VeterinaryCare",
          "name": "ВетДом НН",
          "description": description,
          "url": url,
          "telephone": "+7 (831) 223-45-67",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Нижний Новгород",
            "addressCountry": "RU"
          },
          "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
          "priceRange": "₽₽",
          "serviceType": "Ветеринарные услуги на дому"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;