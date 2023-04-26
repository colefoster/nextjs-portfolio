import React from 'react';

function DropdownRadio() {
  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        id="dropdownRadioHelperButton"
        data-dropdown-toggle="dropdownRadioHelper"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown radio
        <svg
          className=" w-28 h-7 ml-2 "
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        id="dropdownRadioHelper"
        className="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
          <li>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  id="helper-radio-4"
                  name="helper-radio"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="helper-radio-4" className="font-medium text-gray-900 dark:text-gray-300">
                  <div>Individual</div>
                  <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                    Some helpful instruction goes over here.
                  </p>
                </label>
              </div>
            </div>
          </li>
          <li>
            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center h-5">
                <input
                  id="helper-radio-5"
                  name="helper-radio"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="helper-radio-5" className="font-medium text-gray-900 dark:text-gray-300">
                  <div>Company</div>
                  <p id="helper-radio-text-5" className="text-xs font-normal
                                  text-gray-500 dark:text-gray-300">
                                  Some helpful instruction goes over here.
                                </p>
                              </label>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex items-center h-5">
                              <input
                                id="helper-radio-6"
                                name="helper-radio"
                                type="radio"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                            </div>
                            <div className="ml-2 text-sm">
                              <label htmlFor="helper-radio-6" className="font-medium text-gray-900 dark:text-gray-300">
                                <div>Non profit</div>
                                <p id="helper-radio-text-6" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                  Some helpful instruction goes over here.
                                </p>
                              </label>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
  );
}
export default DropdownRadio;                  
