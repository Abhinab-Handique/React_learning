import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
   const [length,setlength]=useState(8);
   const [numberAllowed,setnumberAllowed] = useState(false);
   const [charallowed,setcharallowed] = useState(false);
   const [password,setpassword] = useState("");
   //ref hook
   const passwordref=useRef(null);
   const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*{}"

    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
},[length,numberAllowed,charallowed,setpassword])
  const copyPasswordtoclipboard=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
   useEffect(()=>{
    passwordGenerator()
   },[length,numberAllowed,charallowed,passwordGenerator])

  return (
  
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 '
        placeholder='password'
        readOnly
        ref={passwordref}
        
        />
        <button onClick={copyPasswordtoclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}

          />
<label>Length:{length}</label>
        </div>
      <div className="flex items-center gap-x-1">
       <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setnumberAllowed((prev) => !prev);
          }}
       />
       <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charallowed}
              id="characterInput"
              onChange={() => {
                  setcharallowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>

    </div>
     </div>
  
  )
}

export default App
