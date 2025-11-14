import { getProjects } from '@/lib/cosmic'
import { Project } from '@/types'
import ProjectsList from '@/components/ProjectsList'

export default async function ProjectsPage() {
  const projects = await getProjects()
  const typedProjects = projects as Project[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-600 mt-2">Manage all your projects and track their progress.</p>
      </div>

      <ProjectsList projects={typedProjects} />
    </div>
  )
}