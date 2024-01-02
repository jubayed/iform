import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { addField, formSelector } from '../../../_redux/formSlice';
import { useTranslation } from 'react-i18next';
import { FormFiled } from './field';
import { boxTypes } from '../../../_data/box-type';

export const ItemEmpty = (props) => {

    const { index } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [newItem, setItem] = useState();
    const { data } = useSelector(formSelector);

    const [{ isOver }, drop] = useDrop({
        accept: 'FIELD',
        collect(monitor) {

            const isOver = monitor.isOver();

            if (!isOver) {
                setItem();
            }

            return { isOver }
        },
        hover(item, monitor) {

            const dragIndex = item.index

            if (dragIndex === undefined) {
                if (item && newItem === undefined) {
                    setItem(item);
                }
                return;
            }
        },
        drop: (item) => {

            dispatch(addField({ index, item }));
        },
    });

    const addNewItem = (e)=> {
        e.preventDefault();

        let totalIndex = data.length;

        dispatch(addField({
            index: totalIndex, item: boxTypes[0]
        }));

    }

    return (
        <div className='col-sm-12' ref={drop}>
            {isOver && newItem ? (
                <div className="box active">
                    <div className='position-relative'>
                        <FormFiled item={newItem} />
                    </div>
                </div>
            ) : null}

            <div className={`box  box-placeholder`} onDoubleClick={(e) => addNewItem(e)}>
                <div className="position-relative text-center">
                    <span>{t("Drop a filed or double click field item")}</span>
                </div>
            </div>

        </div>
    )
}
