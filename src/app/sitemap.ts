import { MetadataRoute } from 'next'
import projectsData from '@/data/projects.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.tudominio.com' // TODO: Actualizar al desplegar

    // Rutas estáticas de alto nivel
    const routes = [
        '',
        '/about',
        '/projects',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Rutas dinámicas para cada proyecto
    const projectRoutes = projectsData.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...routes, ...projectRoutes]
}
