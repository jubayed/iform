import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { FiX, FiCopy, FiFeather, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { addField, formSelector, moveField, removeField } from "../../../_redux/formSlice";

export const HandleField = (props) => {

    const { index } = props;
    const { data } = useSelector(formSelector);
    const dispatch = useDispatch();

    const INCREMENT_UNABLE = data.length - 1 === index;
    const DECREMENT_UNABLE = index === 0

    const handleRemoveItem = () => {
        dispatch(removeField(index));
    }

    const handleIncrementItem = () => {
        dispatch(moveField({ dragIndex: index, hoverIndex: index - 1 }));
    }

    const handleDecrementItem = () => {
        dispatch(moveField({ dragIndex: index + 1, hoverIndex: index }));
    }

    const handleDuplicate = () => {

        let item = data.find((i, key) => key === index);

        if (item.hasOwnProperty('label')) {

            let num = parseInt(item.label.replace(/(\D+)/g, ""));
            let label = item.label.replace(/\d+/g, "");

            if (label.includes('Copy')) {

                if (isNaN(num)) {
                    label += " 1";
                } else {
                    label += "" + (num + 1);
                }

            } else {
                label += " Copy";
            }

            item = { ...item, label }
            
        } else if (item.hasOwnProperty('text')) {

            let num = parseInt(item.text.replace(/(\D+)/g, ""));
            let text = item.text.replace(/\d+/g, "");

            if (text.includes('Copy')) {

                if (isNaN(num)) {
                    text += " 1";
                } else {
                    text += "" + (num + 1);
                }

            } else {
                text += " Copy";
            }

            item = { ...item, text }
        }

        dispatch(addField({ index, item }));
    }

    const handleEditItem = () => {
        props.showEdit();
    }

    return (
        <div className="box-handle position-absolute top-0 end-0">
            <div className="btn-group" role="group" aria-label="field box">
                <Button size="sm" variant="link" onClick={handleIncrementItem} disabled={DECREMENT_UNABLE}>
                    <FiChevronUp />
                </Button>
                <Button size="sm" variant="link" onClick={handleDecrementItem} disabled={INCREMENT_UNABLE}>
                    <FiChevronDown />
                </Button>
                <Button size="sm" variant="link" onClick={handleDuplicate} >
                    <FiCopy />
                </Button>
                <Button size="sm" variant="link" onClick={handleEditItem} >
                    <FiFeather />
                </Button>
                <Button size="sm" variant="link" onClick={handleRemoveItem}>
                    <FiX />
                </Button>
            </div>
        </div>
    );
}