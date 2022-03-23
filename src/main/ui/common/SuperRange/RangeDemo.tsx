import React, {useState} from 'react'
//import SuperRange from './common/c7-SuperRange/SuperRange'
import SuperDoubleRange from './common/c8-SuperDoubleRange/SuperDoubleRange'
import stl from './RangeDemo.module.css'

export function RangeDemo() {
    //const [value, setValue] = useState(0)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(100)

    // const onChangeRange = (value: number) => {
    //     setValue(value)
    // }
    const onChangeDoubleRanger = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
    }

    return (
        <div className={stl.container}>
            <span>{value1}</span>
            <SuperDoubleRange
                value={[value1, value2]}
                onChangeRange={onChangeDoubleRanger}
            />
            <span>{value2}</span>
        </div>
    )
}

