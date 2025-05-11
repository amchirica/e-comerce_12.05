"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { DynamicForm } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
})

const columns: ColumnDef<Customer>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(customer)}>Edit</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(customer.id)}>Delete</Button>
        </div>
      )
    },
  },
]

const formFields = [
  { name: "name", label: "Name", type: "text" as const, validation: z.string().min(1, "Name is required") },
  { name: "email", label: "Email", type: "email" as const, validation: z.string().email("Invalid email address") },
  { name: "phone", label: "Phone", type: "text" as const, validation: z.string().min(1, "Phone is required") },
  { name: "address", label: "Address", type: "text" as const, validation: z.string().min(1, "Address is required") },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const handleSubmit = async (data: any) => {
    try {
      if (editingCustomer) {
        const response = await fetch(`/api/customers/${editingCustomer.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        if (!response.ok) throw new Error("Failed to update customer")
        const updatedCustomer = await response.json()
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c))
      } else {
        const response = await fetch("/api/customers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        if (!response.ok) throw new Error("Failed to create customer")
        const newCustomer = await response.json()
        setCustomers([...customers, newCustomer])
      }
      setIsDialogOpen(false)
      setEditingCustomer(null)
    } catch (error) {
      console.error("Error saving customer:", error)
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/customers/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete customer")
      setCustomers(customers.filter(c => c.id !== id))
    } catch (error) {
      console.error("Error deleting customer:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Customer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
            </DialogHeader>
            <DynamicForm fields={formFields} onSubmit={handleSubmit} defaultValues={editingCustomer || {}} submitLabel={editingCustomer ? "Update" : "Create"} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  )
} 