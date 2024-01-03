import React from "react";

function Example() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-1/2 lg:h-96 text-center bg-gray-600 rounded-lg">
        <div className="mt-10 h-full">
        <p className="text-lg font-semibold text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-lg leading-7 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 sm: mb-10">
        <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
