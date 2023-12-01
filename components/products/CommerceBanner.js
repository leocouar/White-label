import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";



function Banner(stores) {
  const router = useRouter();
  const DefaultImage = "https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg";
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .scrollbar::-webkit-scrollbar {
        height: 6.5px;
        background-color: #f5f5f5;
      }
      
      .scrollbar::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
      
      .scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
    return (
      <div className="bg-white max-h-96 w-full overflow-x-auto scrollbar">
      <div className="mx-auto px-2 sm:px-4">
        <div className="mx-auto max-h-96 py-4 sm:py-8 flex flex-nowrap overflow-x-auto scrollbar">
          {stores.stores && stores.stores.map((store, index) => (
            <div className="flex-shrink-0 mx-3 max-w-full" key={index}>
              <div className="bg-gray-200 relative mb-4 h-auto w-36 lg:w-48 border-4 border-gray-200 shadow-lg rounded-lg group-hover:opacity-75 sm:w-40 transition-transform duration-300 transform origin-center hover:scale-110">
                      <Link
                          href={
                              router.pathname === '/stores/list'
                                  ? `/dashboard/[storeId]`
                                  : `/commerce/[storeId]`
                          }
                          as={
                              router.pathname === '/stores/list'
                                  ? `/dashboard/${store.id}`
                                  : `/commerce/${store.id}`
                          }
                      >
                      <img 
                      src={store?.logo?.link || DefaultImage}
                      alt={store.name}
                      className="rounded"
                       />
                      <h1 className="flex truncate justify-center mt-4 font-primary hover:text-clip">{store.name}</h1>
                    
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    )
  }

  export default Banner;