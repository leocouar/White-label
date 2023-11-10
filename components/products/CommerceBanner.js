
  
function Banner() {

    const callouts = [
        {
          name: 'Comercio',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
          href: '#',
        },
        {
          name: 'Comercio',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
          href: '#',
        },
        {
          name: 'Comercio',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
          href: '#',
        },
        {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            href: '#',
          },
          {
            name: 'Comercio',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            href: '#',
          },
                        
          
      ]

    return (
        
        <div className="bg-gray-100 w-full"> 
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto h-100 py-16 sm:py-24 lg:max-w-none flex overflow-x-auto sm: overflow-hidden">
            {callouts.map((callout) => (
              <div className="flex-shrink-0 mx-3 max-w-full">
                <div className="bg-white relative h-auto lg:w-48 border-2 border-gray-200  shadow-lg rounded-lg group-hover:opacity-75 sm:h-64 transition-transform duration-300 transform origin-center hover:scale-110">
                  <a href={callout.href}>
                  <img
                    src={callout.imageSrc}
                    className="rounded"
                  />
                    <h1 className="flex justify-center mt-4 font-primary">{callout.name}</h1>
                    </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default Banner;