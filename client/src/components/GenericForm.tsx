import React, { useEffect, useState } from 'react'
import ThemeInputField from './ThemeInputField';
import ThemeButton from './ThemeButton';

export interface IInputFieldProps {
    label: string,
    type: "text" | "number" | "email" | "password" | "date",
    name: string,
    required?: boolean,
    value?: string,
    placeholder?: string,
    readOnly?: boolean,
};

interface IGenericForm {
    fields: IInputFieldProps[],
    onSubmit: (d: any) => void,
    ostyle?: string
};

const GenericForm = ({fields, onSubmit, ostyle}: IGenericForm) => {

    const [field, setField] = useState<Map<string, string>>(new Map());

    const onInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let preVal = new Map(field);
        preVal.set(e.target.name, e.target.value)
        setField(preVal);
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(field);
    }

    const onFormReset = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(field)
        let preVal = new Map(field);
        preVal.forEach((v, k) => {
            preVal.set(k, '')
        })
        const readFields = fields.filter((f) => f.readOnly);
        readFields.forEach((f) => preVal.set(f.name, f?.value || '0'))
        setField(preVal);
    }

    useEffect(()=> {
        fields.forEach((f) => {
            field.set(f.name, f.value?f.value:'');
        })

    // eslint-disable-next-line
    }, [])

  return (
    fields.length ?
    <form onSubmit={onFormSubmit} onReset={onFormReset} className={"w-full p-4 " + (ostyle ? ostyle : "")}>
        {
            fields.map((props, ind) => {
                return <ThemeInputField key={ind} {...props} value={field?.get(props.name) || ''}  onInputChange={onInpChange} />
            })
        }
        <div className="mt-10 space-x-3">
            <ThemeButton label='Submit' type="submit" />
            <ThemeButton label='Clear' type="reset" />
        </div>
    </form> : <></>
  )
}

export default GenericForm