import { useState } from 'react';
import Drawer from '@components/Drawer';
function Navbar({}) {
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);

    const togglePagesDropdown = () => {
        setShowPagesDropdown(!showPagesDropdown);
    }

    const [showExpandedMenu, setShowExpandedMenu] = useState(false);

    const toggleExpandedMenu = () => {
      setShowExpandedMenu(!showExpandedMenu);
    }


    return (
        <>
        
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">

          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center">
            <svg className='w-10 h-10 text-white fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="20 0 100 100"><text y=".9em" fontSize="90">😻</text></svg>
            <svg className='w-10 h-10 text-white fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="20 0 100 100"><text y=".9em" fontSize="90">🐶 </text></svg>

                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cole Foster</span>
            </a>
            <button onClick={toggleExpandedMenu} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <div className={`${showExpandedMenu ? 'block' : 'hidden'} top-5 w-full md:block md:w-auto`} id="navbar-dropdown">
              <ul className="flex flex-col font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
                </li>
                <li>
                    <button id="dropdownNavbarLink" onClick={togglePagesDropdown} className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Pages <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

                    
                    <div id="dropdownNavbar" className={`${showPagesDropdown ? 'block' :'hidden' } absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                          <li>
                            <a href="/particles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Particles</a>
                          </li>
                          <li>
                            <a href="/emojis" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Emojis</a>
                          </li>
                          <li>
                            <a href="/tf" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">TensorFlow Examples</a>
                          </li>
                        </ul>
                        <div className="py-1">
                          <a href="/playground" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Playground</a>
                        </div>
                    </div>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Jeopardy... eventually</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Page II</a>
                </li>
                <li id="ShowMenuButtonListItem">
                  {/** BUTTON AND INSTANCE OF OFF CANVAS MENU */}
                  <Drawer />

                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>

    );
}

export default Navbar;