import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import TeamMembersList from '@/components/TeamMembersList'

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()
  const typedTeamMembers = teamMembers as TeamMember[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        <p className="text-gray-600 mt-2">Manage your team and their roles.</p>
      </div>

      <TeamMembersList teamMembers={typedTeamMembers} />
    </div>
  )
}