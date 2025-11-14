import { TeamMember } from '@/types'

interface TeamMembersListProps {
  teamMembers: TeamMember[]
}

export default function TeamMembersList({ teamMembers }: TeamMembersListProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No team members found.</p>
      </div>
    )
  }

  // Group by role
  const membersByRole: Record<string, TeamMember[]> = {}
  teamMembers.forEach(member => {
    const roleKey = member.metadata?.role?.key || 'other'
    if (!membersByRole[roleKey]) {
      membersByRole[roleKey] = []
    }
    membersByRole[roleKey].push(member)
  })

  const roleOrder = ['pm', 'developer', 'designer', 'qa', 'other']
  const roleLabels: Record<string, string> = {
    pm: 'Project Managers',
    developer: 'Developers',
    designer: 'Designers',
    qa: 'QA Engineers',
    other: 'Other',
  }

  return (
    <div className="space-y-8">
      {roleOrder.map((roleKey) => {
        const members = membersByRole[roleKey]
        if (!members || members.length === 0) return null

        return (
          <div key={roleKey}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {roleLabels[roleKey]} ({members.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    {member.metadata?.avatar?.imgix_url ? (
                      <img
                        src={`${member.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                        alt={member.title}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                        👤
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.metadata?.full_name || member.title}</h3>
                      {member.metadata?.role && (
                        <p className="text-sm text-gray-600">{member.metadata.role.value}</p>
                      )}
                      {member.metadata?.active !== undefined && (
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                          member.metadata.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.metadata.active ? 'Active' : 'Inactive'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {member.metadata?.email && (
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 break-all">
                        📧 {member.metadata.email}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}