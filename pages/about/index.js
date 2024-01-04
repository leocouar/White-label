import About from "@/components/about/About"
import PageTitle from "@/components/PageTitle"
import SEO from "@/components/SEO"

function AboutPage() {
  return (
      <>
          <SEO title="Sobre Nosotros" />
          <div className='bg-palette-bg'>
            <PageTitle text="Sobre nosotros"/>

            <About/>
          </div>
     </>
  )
}

export default AboutPage