import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Se aplica a todos los buscadores (Google, Bing, DuckDuckGo...)
      allow: '/',     // Permite rastrear toda la web
      disallow: [
        '/api/',      // Evita que indexen tus rutas de servidor internas
        '/admin/',    // Si tuvieras un panel de administración privado
      ],
    },
    sitemap: 'https://www.lamess.es/sitemap.xml', // El enlace directo a tu mapa
  }
}