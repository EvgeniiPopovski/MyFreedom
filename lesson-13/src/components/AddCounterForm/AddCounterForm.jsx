import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';

const AddCounterForm = ({addCounter}) => {
    const [counterName , setCounterName] = useState('')
    const [counterValue , setCounterValue] = useState('')
    const history = useHistory()


    return (
        <form onSubmit={(e) => {e.preventDefault()}}> 
            <div>
            <label htmlFor='name'>enter counter name</label>
                <input name='name' type='text' value={counterName} onChange={(e) => setCounterName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='counter'>enter initial value </label>
                <input name='counter' type='number' value={counterValue} onChange={(e) => setCounterValue(e.target.valueAsNumber)}/>
            </div>
            <button onClick={() => {
                addCounter(counterName , counterValue)
                history.push('/home')
            }}>Save</button>
        </form>
    )
}

export {AddCounterForm}