import './App.css'
import { ThemeProvider }        from '@/components/ThemeProvider'
import { Header }               from '@/components/Header'
import { HeroSection }          from '@/components/HeroSection'
import { SelectedWork }         from '@/components/SelectedWork'
import { ServicesSection }      from '@/components/ServicesSection'
import { TestimonialsSection }  from '@/components/TestimonialsSection'
import { ContactSection }       from '@/components/ContactSection'

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground">
        <Header />
        <HeroSection />
        <SelectedWork />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  )
}
