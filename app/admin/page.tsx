import WaitlistTable from "@/components/ui/waitlist-table"

async function getWaitlistEntries() {
  const res = await fetch("https://mini-waitlist.rek3000.workers.dev/entries", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch entries")
  }
  return res.json()
}

export default async function AdminPage() {
  const entries = await getWaitlistEntries()

  return (
    <main className="p-8">
      <div className="glass-card p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Waitlist Admin</h1>
        <WaitlistTable entries={entries} />
      </div>
    </main>
  )
}

