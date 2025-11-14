import { Project } from '@/types'
import Link from 'next/link'

interface RecentProjectsProps {
  projects: Project[]
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
        <p className="text-gray-600">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
        <Link href="/dashboard/projects" className="text-sm text-blue-600 hover:text-blue-800">
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {projects.map((project) => {
          const statusColor = 
            project.metadata?.status?.key === 'active' ? 'bg-green-100 text-green-800' :
            project.metadata?.status?.key === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'

          return (
            <div key={project.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{project.metadata?.project_name || project.title}</h3>
                  {project.metadata?.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.metadata.description}</p>
                  )}
                  {project.metadata?.client && (
                    <p className="text-xs text-gray-500 mt-2">
                      Client: {project.metadata.client.title}
                    </p>
                  )}
                </div>
                {project.metadata?.status && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                    {project.metadata.status.value}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}