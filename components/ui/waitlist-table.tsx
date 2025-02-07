"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"

interface Entry {
  id: string
  email: string
  joinedAt: string
}

export default function WaitlistTable({ entries: initialEntries }: { entries: Entry[] }) {
  const [entries, setEntries] = useState(initialEntries)

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setEntries(entries.filter((entry) => entry.id !== id))
        toast({
          title: "Success",
          description: "Entry deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete entry")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Joined At</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-white">{entry.email}</TableCell>
              <TableCell className="text-white">{new Date(entry.joinedAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleDelete(entry.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

