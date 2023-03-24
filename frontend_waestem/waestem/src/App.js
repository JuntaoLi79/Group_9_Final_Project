import React, {useState, useEffect} from 'react'

function App() {
    const [data, setData] = useState([{}]) // initial value is an empty array
    useEffect(() => { fetch("/members").then(res => res.json()).then(data => {setData(data);console.log(data)}) }, [])
  return (
    
    <div>

    {
        (typeof data.members === 'undefined') ? (<p>loading...</p>) : (
            data.members.map((member, index) => (
                <p key={index}> {member}</p>
            ))
            )
    
        }
    </div>

        )
    }
export default App