import { AttendanceRecord } from '@/types'

interface TodayAttendanceProps {
  records: AttendanceRecord[]
}

export default function TodayAttendance({ records }: TodayAttendanceProps) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h2>
        <p className="text-gray-600">No attendance records for today.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => {
          const statusColor =
            record.metadata?.status?.key === 'checked-in' ? 'bg-green-100 text-green-800' :
            record.metadata?.status?.key === 'checked-out' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'

          const teamMember = record.metadata?.team_member

          return (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {teamMember?.metadata?.avatar?.imgix_url && (
                  <img
                    src={`${teamMember.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={teamMember.title}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{teamMember?.title || 'Unknown'}</h3>
                  {teamMember?.metadata?.role && (
                    <p className="text-xs text-gray-500">{teamMember.metadata.role.value}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {record.metadata?.status && (
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                    {record.metadata.status.value}
                  </span>
                )}
                {record.metadata?.check_in_time && (
                  <p className="text-sm text-gray-600">
                    Check In: {record.metadata.check_in_time}
                  </p>
                )}
                {record.metadata?.check_out_time && (
                  <p className="text-sm text-gray-600">
                    Check Out: {record.metadata.check_out_time}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}