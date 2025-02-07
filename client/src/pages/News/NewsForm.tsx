import { INewsForm } from '../../utils/ITypes';
import GenericForm, { IInputFieldProps } from '../../components/GenericForm';

interface INewsFormCard {
    d?: INewsForm,
    onSubmit: (d: INewsForm) => void
};

const NewsFormCard = ({d, onSubmit}: INewsFormCard) => {

    const fields: IInputFieldProps[] = [
        {label: "News id", name: "newsid", type: "number", value: d?.newsid?.toString() || '0', readOnly: true},
        {label: "Title", name: "title", type: "text", value: d?.title, required: true},
        {label: "Img URL", name: "img", type: "text", value: d?.img},
        {label: "Description", name: "description", type: "text", value: d?.description, required: true}
    ]

    return (
        <GenericForm 
            fields={fields}
            onSubmit={onSubmit}
        />
    );
}

export default NewsFormCard

    