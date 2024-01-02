import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { FormFiled } from './field';
import { HandleField } from './_action';
import { addField, moveField } from '../../../_redux/formSlice';
import { __currentClass } from '../../../_support/helper';

export const Item = (props) => {

    const { index, isActive, layoutWith, data } = props;
    const card = data[index];
    const dispatch = useDispatch();
    const dragRef = useRef(null);
    const dropRef = useRef(null);
    const boxRef = useRef(null);
    const [newItem, setNewItem] = useState();

    const [{ handlerId, isOver, isAppend }, drop] = useDrop({
        accept: 'FIELD',
        collect(monitor) {

            const isOver = monitor.isOver();
            const handlerId = monitor.getHandlerId();
            const isAppend = monitor.isOver() && monitor.isAppend ? monitor.isAppend : false;

            if (!isOver) {
                setNewItem();
                monitor.isAppend = false;
            }

            return { handlerId, isOver, isAppend }
        },
        hover(item, monitor) {
            if (!dragRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = dragRef.current?.getBoundingClientRect()

            // Get horizontal middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2.2;

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Get pixels to the right
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            if (dragIndex === undefined) {

                setNewItem(item);

                if (hoverClientX > hoverMiddleX) {
                    // monitor.isAppend = true;
                }

                return;
            }

            // Time to actually perform the action
            dispatch(moveField({ dragIndex, hoverIndex }));

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
        drop: (item, monitor) => {
            // Access additional information from the monitor
            // const isDroppedInsideTarget = monitor.didDrop();

            // console.log('Dropped inside target:', isDroppedInsideTarget);
            /**
             * When sort item item has only index property 
             * 
             * And drop a new item has many property
             */
            if (item.index === undefined) {
                setNewItem();
                if (monitor.isAppend) {

                    monitor.isAppend = false;
                } else {
                    dispatch(addField({ index, item }));
                }
            }
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD',
        item: () => {
            return { index }
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            }
        }
    })

    const opacity = isDragging ? .3 : 1;

    // card.parentClass
    const pClass = __currentClass(card?.parentClass, layoutWith);

    drag(dragRef);
    drop(dropRef);
    return (
        <div ref={dropRef} className={pClass}>
            <div ref={boxRef} className={`box ${!isOver && isActive ? ' active' : ''}`} onDoubleClick={() => props.setEditId(index)} style={{ width: isAppend ? '50%' : '100%' }}>
                {card ? (
                    <div ref={dragRef} style={{ opacity: opacity }} onClick={props.onClick} className='position-relative' data-handler-id={handlerId}>
                        <HandleField
                            index={index}
                            showEdit={() => props.setEditId(index)}
                        />
                        <FormFiled item={card} key={index} />
                    </div>
                ) : null}
            </div>
            <div className={`box box-bottom ${newItem && isOver ?' active' : ''}`}>
                {newItem? (
                    <div className='position-relative'>
                        <FormFiled item={newItem} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
