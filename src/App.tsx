import './App.css'
import { ThemeProvider }        from '@/components/ThemeProvider'
import { Header }               from '@/components/Header'
import { HeroSection }          from '@/components/HeroSection'
import { AboutSection }         from '@/components/AboutSection'
import { PhotoGallery }         from '@/components/ui/gallery'
import { ServicesSection }      from '@/components/ServicesSection'
import { BrandsSection }        from '@/components/BrandsSection'
import { TestimonialsSection }  from '@/components/TestimonialsSection'
import { ContactSection }       from '@/components/ContactSection'

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground">
        <Header />
        <HeroSection />
        <AboutSection />
        <PhotoGallery />
        <ServicesSection />
        <BrandsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  )
}
