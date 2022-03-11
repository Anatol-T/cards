import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react';
import s from './SuperInputPassword.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputPasswordPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const SuperInputPassword: React.FC<SuperInputPasswordPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [isShown, setIsShow] = useState<boolean>(false);

    const typeInput = isShown ? 'text' : 'password';

    const togglePassword = () => setIsShow(!isShown);

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    // const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.superInput} ${error && s.errorInput} ${className}`  // need to fix with (?:) and s.superInput

    return (
        <>
            <div className={s.inputContainer}>
                <input
                    type={typeInput}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}

                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                <button onClick={togglePassword} className={`${s.eye} ${isShown && s.eyeShow}`}></button>
                {/*{error && <span className={finalSpanClassName}>{error}</span>}*/}
            </div>
        </>
    )
};

export default SuperInputPassword;
