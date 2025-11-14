import { Task } from '@/types'
import Link from 'next/link'

interface RecentTasksProps {
  tasks: Task[]
}

export default function RecentTasks({ tasks }: RecentTasksProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
        <p className="text-gray-600">No tasks found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
        <Link href="/dashboard/tasks" className="text-sm text-blue-600 hover:text-blue-800">
          View all →
        </Link>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => {
          const statusColor = 
            task.metadata?.status?.key === 'done' ? 'bg-green-100 text-green-800' :
            task.metadata?.status?.key === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'

          const priorityColor =
            task.metadata?.priority?.key === 'high' ? 'text-red-600' :
            task.metadata?.priority?.key === 'medium' ? 'text-yellow-600' :
            'text-gray-600'

          return (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{task.metadata?.task_title || task.title}</h3>
                {task.metadata?.project && (
                  <p className="text-xs text-gray-500 mt-1">
                    Project: {task.metadata.project.title}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {task.metadata?.priority && (
                  <span className={`text-xs font-medium ${priorityColor}`}>
                    {task.metadata.priority.value}
                  </span>
                )}
                {task.metadata?.status && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                    {task.metadata.status.value}
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