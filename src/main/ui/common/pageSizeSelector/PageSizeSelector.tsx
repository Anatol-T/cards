import React, {ChangeEvent, useState} from 'react';
import SuperSelect from "../SuperSelect/SuperSelect";
import styles from './PageSizeSelector.module.css'

type PropsType = {
    pageCount: number
    handler: (value: number) => void
    totalCount: number
}
export const PageSizeSelector: React.FC<PropsType> = ({pageCount, handler, totalCount}) => {

    const arr: number[] = [8, 10, 20, 50]

    const [value, setValue] = useState(pageCount)

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = +e.currentTarget.value
        setValue(value)
        handler(value)
    }

    return (
        <div className={styles.containerSelector}>
            <p>Show</p>
            <SuperSelect
                totalCount={totalCount}
                options={arr}
                value={value}
                onChange={onChangeHandler}
            />
            <p>Cards per Page</p>
        </div>
    );
};
