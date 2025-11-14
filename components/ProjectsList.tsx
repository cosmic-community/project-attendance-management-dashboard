import { Project } from '@/types'

interface ProjectsListProps {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const statusColor =
          project.metadata?.status?.key === 'active' ? 'bg-green-100 text-green-800' :
          project.metadata?.status?.key === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'

        return (
          <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.metadata?.project_name || project.title}
              </h3>
              {project.metadata?.status && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                  {project.metadata.status.value}
                </span>
              )}
            </div>

            {project.metadata?.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.metadata.description}</p>
            )}

            {project.metadata?.client && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Client</p>
                <div className="flex items-center gap-2">
                  {project.metadata.client.metadata?.company_logo?.imgix_url && (
                    <img
                      src={`${project.metadata.client.metadata.company_logo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={project.metadata.client.title}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {project.metadata.client.metadata?.company_name || project.metadata.client.title}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {project.metadata?.start_date && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(project.metadata.start_date).toLocaleDateString()}
                  </p>
                </div>
              )}
              {project.metadata?.end_date && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">End Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(project.metadata.end_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}