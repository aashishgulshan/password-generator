import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [lenth, setLenth] = useState(8);
  const [numberAll, setNumberAll] = useState(false);
  const [charAll, setCharAll] = useState(true);
  const [Password, setPassword] = useState('');
  const [button, setButton] = useState('copy');

  // useRef
  const passwordRef = useRef(null)

  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAll) str += "0123456789";
    if (charAll) str += "!@#$%^&*";

    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenth, numberAll, charAll, setPassword]);

  const copyPassword = useCallback(() => {
    setButton('Coppied')
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    passwordGenerater();
  },[lenth, numberAll, charAll, passwordGenerater])
  return (
    <div>
      <div className="max-w-lg mx-auto mt-5 bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-center text-3xl text-gray-200 mb-4">
          Password Generater
        </h1>
        <div className="mx-5">
          <form action="">
            <input
              type="text"
              value={Password}
              placeholder="Password..."
              className="py-1 px-4 rounded-l-md shadow-md outline-none"
              readOnly
              ref={passwordRef}
            />
            <button
            //  onClick={()=>{setButton('Coppied')}}
            onClick={copyPassword}
             className="bg-orange-500 hover:bg-orange-600 text-gray-50 py-1 px-4 rounded-r-md shrink-0 shadow-md outline-none">
              {button}
            </button>
            <div className="py-2 text-orange-500 space-x-2">
              <input
                type="range"
                min={8}
                max={50}
                step={1}
                value={lenth}
                className=" cursor-pointer"
                onChange={(e) => setLenth(e.target.value)}
              />
              <label htmlFor="range">Length:{lenth}</label>

              <input
                type="checkbox"
                defaultChecked={numberAll}
                id="numberInput"
                onChange={() => {
                  setNumberAll((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Number</label>

              <input
                type="checkbox"
                defaultChecked={numberAll}
                id="characterInput"
                onChange={() => {
                  setCharAll((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
