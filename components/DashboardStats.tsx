interface DashboardStatsProps {
  activeProjects: number
  pendingTasks: number
  totalTeamMembers: number
  checkedInToday: number
}

export default function DashboardStats({
  activeProjects,
  pendingTasks,
  totalTeamMembers,
  checkedInToday,
}: DashboardStatsProps) {
  const stats = [
    {
      name: 'Active Projects',
      value: activeProjects,
      icon: '📋',
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Tasks',
      value: pendingTasks,
      icon: '✅',
      color: 'bg-yellow-500',
    },
    {
      name: 'Team Members',
      value: totalTeamMembers,
      icon: '👥',
      color: 'bg-green-500',
    },
    {
      name: 'Checked In Today',
      value: checkedInToday,
      icon: '⏰',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}