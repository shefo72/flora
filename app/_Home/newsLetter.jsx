import React from 'react'

export default function NewsLetter() {
    return <>
        <section className="my-20">
      <div className="bg-stone-200 py-16 px-6 max-w-2xl mx-auto text-center space-y-6 rounded-4xl">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800">Join Our Floral Community</h2>
          <p className="text-gray-600 text-sm max-w-md mt-4">
              Receive weekly inspiration, seasonal care tips, and exclusive access
              to new collection launches.</p>
        </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-green-800 text-sm"
            />
            <button className="bg-green-800 text-white px-8 py-3 rounded-full hover:bg-green-900 transition text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
}
