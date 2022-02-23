import React, {useState} from 'react';
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../components/common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../components/common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../components/common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../components/common/c7-SuperRange/SuperRange";
//import SuperDoubleRange from "../../components/common/c8-SuperDoubleRange/SuperDoubleRange";

export function Demo() {
  const arr = ['x', 'y', 'z']
  const [value, onChangeOption] = useState(arr[1])

  return (
    <div>
      <h3>Demo page</h3>
      <div><SuperInputText/></div>
      <div><SuperButton>Button</SuperButton></div>
      <div><SuperCheckbox/></div>
      <div><SuperEditableSpan/></div>
      <div><SuperSelect/></div>
      <div><SuperRadio name={'radio'}
                       options={arr}
                       value={value}
                       onChangeOption={onChangeOption}
      /></div>
      <div><SuperRange/></div>
      {/*<SuperDoubleRange onChangeRange={} value={}/>*/}
    </div>
  );
}

