import Link from 'next/link'

export default function Sidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Projects', href: '/dashboard/projects', icon: '📋' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✅' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Attendance', href: '/dashboard/attendance', icon: '⏰' },
    { name: 'Clients', href: '/dashboard/clients', icon: '🏢' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">PM Dashboard</h1>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}