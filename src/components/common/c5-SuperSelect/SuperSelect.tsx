import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import stl from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
      className,
        ...restProps
    }
) => {
    const mappedOptions = options ? options.map(m=> {
      return <option key={m} style={m === restProps.value ? {backgroundColor: "rgba(161, 250, 161, 0.8)"}: {backgroundColor: "rgba(161, 250, 161, 0.3)"} }>{m}</option>
    })
    :[]; // map options with key
    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // onChange, onChangeOption
      onChangeOption && onChangeOption(e.currentTarget.value)
      onChange && onChange(e)
    }
  const finalSelectClassName = `$ ${className ? className : stl.superSelect}`
    return (
        <select onChange={onChangeCallback} className={finalSelectClassName} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
