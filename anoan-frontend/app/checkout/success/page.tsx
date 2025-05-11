import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, Package, Truck } from "lucide-react"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  // Current date formatted
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="bg-muted/50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Order Confirmation</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been received and is now being processed. We've sent a confirmation email with your order
            details.
          </p>

          <div className="bg-muted rounded-lg p-6 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h3>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
                <p className="font-medium">{orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                <p className="font-medium">customer@example.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
                <p className="font-medium">Credit Card (•••• 4242)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-muted-foreground">We're preparing your order for shipment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">Your order will be shipped within 1-2 business days</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/account/orders/${orderNumber}`}>View Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
