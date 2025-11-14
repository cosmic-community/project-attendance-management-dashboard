import { Client } from '@/types'

interface ClientsListProps {
  clients: Client[]
}

export default function ClientsList({ clients }: ClientsListProps) {
  if (!clients || clients.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No clients found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div key={client.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            {client.metadata?.company_logo?.imgix_url ? (
              <img
                src={`${client.metadata.company_logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={client.title}
                width={80}
                height={80}
                className="rounded-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-3xl">
                🏢
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {client.metadata?.company_name || client.title}
              </h3>
              {client.metadata?.contact_person && (
                <p className="text-sm text-gray-600 mt-1">{client.metadata.contact_person}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200">
            {client.metadata?.email && (
              <p className="text-sm text-gray-600 break-all">
                📧 {client.metadata.email}
              </p>
            )}
            {client.metadata?.phone && (
              <p className="text-sm text-gray-600">
                📞 {client.metadata.phone}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}