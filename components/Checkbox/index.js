import React from 'react'

function Checkbox({
    isChecked = false,
    onChange = () => { },
    onClick = () => { },
    id,
    labelText = false,
    labelClass = "",
    disabled = false
}) {
    return (
        <div className='checkbox-block'>
            <label className='checkbox-label' htmlFor={id}>
                <div className={`checkbox-content ${isChecked ? 'fill' : ''} ${disabled ? 'disabled' : ''}`}>
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20971 3.57007H2.20989C2.28919 3.57016 2.36744 3.58822 2.43876 3.62289C2.51004 3.65753 2.57255 3.70786 2.6216 3.77011L2.20971 3.57007ZM2.20971 3.57007H1.39057C1.18694 3.57007 1.07323 3.80466 1.19895 3.96411L1.199 3.96418L4.40877 8.03058L4.40881 8.03064C4.6191 8.29679 5.02231 8.29605 5.2333 8.03109L5.23371 8.03057L10.9563 0.778896C10.9565 0.778687 10.9566 0.778478 10.9568 0.778269C11.085 0.617843 10.9665 0.384912 10.7656 0.384912H9.94643C9.78604 0.384912 9.63331 0.458413 9.53423 0.585353C9.53414 0.585463 9.53405 0.585573 9.53397 0.585683L4.82066 6.55648M2.20971 3.57007L4.82066 6.55648M4.82066 6.55648L2.62169 3.77022L4.82066 6.55648Z" fill="white" stroke="white" strokeWidth="0.3" />
                    </svg>
                </div>
                {labelText && <div className={`label-text ${labelClass}`}>{labelText}</div>}
            </label>
            <input
                type="checkbox"
                id={id}
                hidden
                checked={isChecked}
                onChange={onChange}
                onClick={onClick}
                disabled={disabled}
            />
        </div>
    )
}

export default Checkbox