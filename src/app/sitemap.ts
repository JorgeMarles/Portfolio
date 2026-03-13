import { MetadataRoute } from 'next'
import { ProjectService } from '@/services/project.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projectsData = await ProjectService.getAllProjects();
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
