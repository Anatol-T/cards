import React, {useState} from 'react';
import SuperButton from "../main/ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../main/ui/common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../main/ui/common/SuperInputText/SuperInputText";
import s from './test.module.css';
import SuperEditableSpan from "../main/ui/common/SuperEditableSpan/SuperEditableSpan";

export const Test = () => {
    const [value, setValue] = useState<string>('')

    return (
        <div className={s.container}>
            <SuperButton>BUTTON</SuperButton>
            <SuperCheckbox/>
            <SuperInputText/>
            <div>
                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />
            </div>
        </div>
    );
};
