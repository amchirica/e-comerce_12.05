"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mesaj trimis cu succes!",
        description: "Vă vom contacta cât mai curând posibil.",
      })
      setIsSubmitting(false)
      // Reset form
      e.currentTarget.reset()
    }, 1000)
  }

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="bg-muted/50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Acasă
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Contact</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Contactați-ne</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aveți întrebări sau aveți nevoie de asistență? Suntem aici pentru a vă ajuta. Completați formularul de mai
              jos sau utilizați informațiile noastre de contact pentru a ne contacta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Trimiteți-ne un mesaj</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prenume</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nume</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subiect</Label>
                      <Input id="subject" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesaj</Label>
                      <Textarea id="message" rows={5} placeholder="Cum vă putem ajuta?" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Se trimite..." : "Trimite mesaj"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">Informații de contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adresă</h3>
                      <address className="not-italic text-muted-foreground">
                        Iasi, Strada Veche, nr. 95A
                        <br />
                        România
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:anoan.business@gmail.com" className="hover:text-primary">
                          anoan.business@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:0733262911" className="hover:text-primary">
                          0733262911
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Program de lucru</h2>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Luni - Vineri</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sâmbătă</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duminică</span>
                    <span>Închis</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20485.508937327784!2d27.58694543333442!3d47.15873479835716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1746783885104!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locația magazinului"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
