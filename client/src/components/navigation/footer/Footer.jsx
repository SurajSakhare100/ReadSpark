import React from 'react'

function Footer() {
  return (
    <footer className="mb-4 w-full max-w-[66rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 border-t border-gray-400 ">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-xs text-gray-600 ">
              © 2024 ReadSpark .
            </p>
          </div>
          <ul className="flex flex-wrap items-center">
            <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:text-neutral-500 dark:before:bg-neutral-600">
              <a target='_blank' className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 " href="https://www.surajsakhare.me/">
                PortFolio
              </a>
            </li>
            <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:text-neutral-500 dark:before:bg-neutral-600">
              <a target='_blank' className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 " href="https://www.linkedin.com/in/suraj-sakhare10/">
                Linkdin
              </a>
            </li>
            <li className="inline-block pe-4 text-xs">
              <a  target='_blank' className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 " href="https://github.com/SurajSakhare100">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
