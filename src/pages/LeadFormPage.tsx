import { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Statistics from "@/components/Statistics"
import Languages from "@/components/Languages"
import MethodSection from "@/components/MethodSection"
import Plans from "@/components/Plans"
import GoogleReviews from "@/components/GoogleReviews"
import FAQ from "@/components/FAQ"
import CTAFinal from "@/components/CTAFinal"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import LeadFormModal from "@/components/LeadFormModal"
import { Toaster } from "@/components/ui/toaster"

export default function LeadFormPage() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  return (
    <>
      <main className="min-h-screen bg-neutral-50">
        <Navbar />
        <Hero openLeadForm={handleOpen} />
        <About openLeadForm={handleOpen} />
        <Statistics />
        <Languages openLeadForm={handleOpen} />
        <MethodSection openLeadForm={handleOpen} />
        <Plans openLeadForm={handleOpen} />
        <GoogleReviews />
        <FAQ />
        <CTAFinal openLeadForm={handleOpen} />
        <Contact openLeadForm={handleOpen} />
        <Footer />
      </main>
      <LeadFormModal open={open} onOpenChange={setOpen} />
      <Toaster />
    </>
  )
}
