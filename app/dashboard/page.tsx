import { getProjects, getTasks, getTeamMembers, getAttendanceRecords } from '@/lib/cosmic'
import { Project, Task, TeamMember, AttendanceRecord } from '@/types'
import DashboardStats from '@/components/DashboardStats'
import RecentProjects from '@/components/RecentProjects'
import RecentTasks from '@/components/RecentTasks'
import TodayAttendance from '@/components/TodayAttendance'

export default async function DashboardPage() {
  const [projects, tasks, teamMembers, attendanceRecords] = await Promise.all([
    getProjects(),
    getTasks(),
    getTeamMembers(),
    getAttendanceRecords(),
  ])

  // Cast to proper types
  const typedProjects = projects as Project[]
  const typedTasks = tasks as Task[]
  const typedTeamMembers = teamMembers as TeamMember[]
  const typedAttendanceRecords = attendanceRecords as AttendanceRecord[]

  // Calculate stats
  const activeProjects = typedProjects.filter(p => p.metadata?.status?.key === 'active').length
  const pendingTasks = typedTasks.filter(t => t.metadata?.status?.key !== 'done').length
  const totalTeamMembers = typedTeamMembers.length
  
  // Get today's date
  const today = new Date().toISOString().split('T')[0]
  const todayAttendance = typedAttendanceRecords.filter(
    record => record.metadata?.work_date === today
  )
  const checkedInToday = todayAttendance.filter(
    record => record.metadata?.status?.key === 'checked-in'
  ).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your projects and team.</p>
      </div>

      <DashboardStats 
        activeProjects={activeProjects}
        pendingTasks={pendingTasks}
        totalTeamMembers={totalTeamMembers}
        checkedInToday={checkedInToday}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <RecentProjects projects={typedProjects.slice(0, 3)} />
        <RecentTasks tasks={typedTasks.slice(0, 5)} />
      </div>

      <div className="mt-8">
        <TodayAttendance records={todayAttendance} />
      </div>
    </div>
  )
}