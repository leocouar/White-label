
  
function Banner(stores) {

    return (
<div className="bg-white max-h-96 w-full">
      <div className="mx-auto px-2 sm:px-4">
        <div className="mx-auto max-h-96 py-4 sm:py-8 flex flex-nowrap overflow-x-auto">
          {stores.stores.map((store, index) => (
            <div className="flex-shrink-0 mx-3 max-w-full" key={index}>
              <div className="bg-gray-200 relative mb-4 h-auto w-36 lg:w-48 border-4 border-gray-200 shadow-lg rounded-lg group-hover:opacity-75 sm:w-40 transition-transform duration-300 transform origin-center hover:scale-110">
                <a href={`commerce/${store.id}`}>
                  <img src={store.logo.link} alt={store.name} className="rounded" />
                  <h1 className="flex truncate justify-center mt-4 font-primary hover:text-clip">{store.name}</h1>
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