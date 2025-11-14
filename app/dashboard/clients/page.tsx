import { getClients } from '@/lib/cosmic'
import { Client } from '@/types'
import ClientsList from '@/components/ClientsList'

export default async function ClientsPage() {
  const clients = await getClients()
  const typedClients = clients as Client[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-600 mt-2">Manage client information and relationships.</p>
      </div>

      <ClientsList clients={typedClients} />
    </div>
  )
}