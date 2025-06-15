import React from 'react'
import Header from './Header'

function Hero() {
  return (
    <section className="bg-white h-[calc(100vh-73px)] flex items-center justify-center dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            <div>
              <strong className="text-[#0f52ff]">Take Control</strong> of Your Finances
            </div>
            <div className="mt-2">
              Anytime, Anywhere
            </div>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Track your daily expenses, set smart budgets, and make informed financial decisions with ease. 
            Tailored for university students to manage both school and personal expenses in a simple, stress-free platform.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
            className="inline-block rounded border border-[#0f52ff] bg-[#0f52ff] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#002ccd]"
            href="#"
            >
            Start Tracking Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
