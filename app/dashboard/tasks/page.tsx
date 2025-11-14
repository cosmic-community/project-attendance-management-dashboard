import { getTasks, getProjects } from '@/lib/cosmic'
import { Task, Project } from '@/types'
import TasksList from '@/components/TasksList'

export default async function TasksPage() {
  const [tasks, projects] = await Promise.all([
    getTasks(),
    getProjects(),
  ])

  const typedTasks = tasks as Task[]
  const typedProjects = projects as Project[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <p className="text-gray-600 mt-2">View and manage all tasks across projects.</p>
      </div>

      <TasksList tasks={typedTasks} projects={typedProjects} />
    </div>
  )
}