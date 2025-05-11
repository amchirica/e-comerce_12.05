"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { DynamicForm } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

interface Order {
  id: string
  customer: string
  total: number
  status: string
  date: string
}

const orderSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  total: z.number().min(0, "Total must be positive"),
  status: z.string().min(1, "Status is required"),
  date: z.string().min(1, "Date is required"),
})

const columns: ColumnDef<Order>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "total", header: "Total", cell: ({ row }) => `$${row.original.total.toFixed(2)}` },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(order)}>Edit</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(order.id)}>Delete</Button>
        </div>
      )
    },
  },
]

const formFields = [
  { name: "customer", label: "Customer", type: "text" as const, validation: z.string().min(1, "Customer is required") },
  { name: "total", label: "Total", type: "number" as const, validation: z.number().min(0, "Total must be positive") },
  { name: "status", label: "Status", type: "text" as const, validation: z.string().min(1, "Status is required") },
  { name: "date", label: "Date", type: "text" as const, validation: z.string().min(1, "Date is required") },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  const handleSubmit = async (data: any) => {
    try {
      if (editingOrder) {
        const response = await fetch(`/api/orders/${editingOrder.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        if (!response.ok) throw new Error("Failed to update order")
        const updatedOrder = await response.json()
        setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o))
      } else {
        const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        if (!response.ok) throw new Error("Failed to create order")
        const newOrder = await response.json()
        setOrders([...orders, newOrder])
      }
      setIsDialogOpen(false)
      setEditingOrder(null)
    } catch (error) {
      console.error("Error saving order:", error)
    }
  }

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete order")
      setOrders(orders.filter(o => o.id !== id))
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Order</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingOrder ? "Edit Order" : "Add New Order"}</DialogTitle>
            </DialogHeader>
            <DynamicForm fields={formFields} onSubmit={handleSubmit} defaultValues={editingOrder || {}} submitLabel={editingOrder ? "Update" : "Create"} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={orders} searchKey="customer" />
    </div>
  )
} 