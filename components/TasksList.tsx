import { Task, Project } from '@/types'

interface TasksListProps {
  tasks: Task[]
  projects: Project[]
}

export default function TasksList({ tasks, projects }: TasksListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No tasks found.</p>
      </div>
    )
  }

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(t => t.metadata?.status?.key === 'todo'),
    'in-progress': tasks.filter(t => t.metadata?.status?.key === 'in-progress'),
    done: tasks.filter(t => t.metadata?.status?.key === 'done'),
  }

  const columns = [
    { key: 'todo' as const, title: 'To Do', color: 'bg-gray-100' },
    { key: 'in-progress' as const, title: 'In Progress', color: 'bg-blue-100' },
    { key: 'done' as const, title: 'Done', color: 'bg-green-100' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.key} className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className={`text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200 ${column.color} -m-4 mb-4 p-4 rounded-t-lg`}>
            {column.title}
            <span className="ml-2 text-sm text-gray-600">({tasksByStatus[column.key].length})</span>
          </h3>
          <div className="space-y-3">
            {tasksByStatus[column.key].map((task) => {
              const priorityColor =
                task.metadata?.priority?.key === 'high' ? 'border-l-4 border-red-500' :
                task.metadata?.priority?.key === 'medium' ? 'border-l-4 border-yellow-500' :
                'border-l-4 border-gray-300'

              return (
                <div key={task.id} className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${priorityColor}`}>
                  <h4 className="font-medium text-gray-900 mb-2">{task.metadata?.task_title || task.title}</h4>
                  
                  {task.metadata?.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.metadata.description}</p>
                  )}

                  {task.metadata?.project && (
                    <p className="text-xs text-gray-500 mb-2">
                      📋 {task.metadata.project.title}
                    </p>
                  )}

                  {task.metadata?.assigned_to && (
                    <div className="flex items-center gap-2 mb-2">
                      {task.metadata.assigned_to.metadata?.avatar?.imgix_url && (
                        <img
                          src={`${task.metadata.assigned_to.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                          alt={task.metadata.assigned_to.title}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-xs text-gray-600">{task.metadata.assigned_to.title}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    {task.metadata?.priority && (
                      <span className="text-xs font-medium text-gray-600">
                        Priority: {task.metadata.priority.value}
                      </span>
                    )}
                    {task.metadata?.due_date && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(task.metadata.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
            {tasksByStatus[column.key].length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}