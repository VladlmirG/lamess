import { MetadataRoute } from 'next'
import { CAMPANAS_PUBLICAS } from '@/lib/campanas'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lamess.es'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculador`, 
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tarifas-madrid`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tarifas-barcelona`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 21-oct · INC-0020 · Campañas: solo cuando sea pública (ver lib/campanas).
    ...(CAMPANAS_PUBLICAS
      ? [{ url: `${baseUrl}/campanas`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 }]
      : []),
  ]
}