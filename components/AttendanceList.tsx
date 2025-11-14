import { AttendanceRecord, TeamMember } from '@/types'

interface AttendanceListProps {
  records: AttendanceRecord[]
  teamMembers: TeamMember[]
}

export default function AttendanceList({ records, teamMembers }: AttendanceListProps) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No attendance records found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => {
              const statusColor =
                record.metadata?.status?.key === 'checked-in' ? 'bg-green-100 text-green-800' :
                record.metadata?.status?.key === 'checked-out' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'

              const teamMember = record.metadata?.team_member

              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {teamMember?.metadata?.avatar?.imgix_url && (
                        <img
                          src={`${teamMember.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                          alt={teamMember.title}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {teamMember?.title || 'Unknown'}
                        </div>
                        {teamMember?.metadata?.role && (
                          <div className="text-xs text-gray-500">
                            {teamMember.metadata.role.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.metadata?.work_date && new Date(record.metadata.work_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.metadata?.check_in_time || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.metadata?.check_out_time || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.metadata?.status && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                        {record.metadata.status.value}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="line-clamp-2">{record.metadata?.notes || '-'}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}