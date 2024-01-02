import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { addField } from '../_redux/formSlice';
import { useTranslation } from 'react-i18next';

export const ItemDownPlace = (props) => {

    const { index } = props;
    const {t}= useTranslation();
    const dispatch = useDispatch();

    const ref = useRef(null)
    const [{ isActive, handlerId }, drop] = useDrop({
        accept: 'FIELD',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                isActive: monitor.canDrop() && monitor.isOver(),
            }
        },
        drop: (item) => {
            dispatch(addField({ index, item }));
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD',
        canDrag: false,
        item: () => {
            return { index }
        },
    })

    drag(drop(ref));

    return (
        <div
            className={`placeholder-box-down${isActive ? ' active' : ''} position-absolute bottom-0 start-0 end-0`}
            ref={ref}
            data-handler-id={handlerId}
            data-is-dragging={isDragging}
        >
            hi
            <div>
                {isActive ? (
                    <div className='mb-3'>
                        {t("drop here if you want")}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
