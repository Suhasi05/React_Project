import React, { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
    const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "1234567890";
    if(charAllowed) str += "`~!@#$%^&*()_+-=\][|}{';/,>:.<";

    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 ">Password Generator</h1>
        <div className="mb-4"> 
          <label className="block font-medium text-gray-700  mb-2" htmlFor="password">
            Generated Password
          </label>
          <div className='flex items-center'>
            <input type="text" value={password} id="password" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" readOnly
            ref={passwordRef} />
              <button className='bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 focus:border-transparent text-white'
               onClick={copyPasswordToClipboard} >
                 <CopyIcon className="h-6 w-5" />
               </button>
          </div>
        </div>
        <div className="mb-4"></div>
          <label htmlFor="length" className='block mb-2'>
            Password Length
          </label>
          <input type="number" id="length" defaultValue={8} max="100" min="8" value={length}
          className="bg-gray-200 px-4 py-2 rounded-md w-full flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          onChange={(e) => {setLength(e.target.value)}} />
        
        <div className="flex flex-row mb-4 mt-5">
          <p className="mb-2 mr-5">Include : </p>
          <div className="flex items-center space-x-2 mr-3">
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="charInput" defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)} />
            <label htmlFor="charInput">Symbols</label>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

export default App
