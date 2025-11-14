import { getAttendanceRecords, getTeamMembers } from '@/lib/cosmic'
import { AttendanceRecord, TeamMember } from '@/types'
import AttendanceList from '@/components/AttendanceList'

export default async function AttendancePage() {
  const [attendanceRecords, teamMembers] = await Promise.all([
    getAttendanceRecords(),
    getTeamMembers(),
  ])

  const typedAttendanceRecords = attendanceRecords as AttendanceRecord[]
  const typedTeamMembers = teamMembers as TeamMember[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-2">Track daily attendance and work hours.</p>
      </div>

      <AttendanceList 
        records={typedAttendanceRecords} 
        teamMembers={typedTeamMembers}
      />
    </div>
  )
}