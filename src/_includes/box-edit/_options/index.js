import React, { Fragment, useEffect, useMemo, useState } from "react";
import update from 'immutability-helper'
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { useTranslation } from "react-i18next";
import { HTML5Backend } from "react-dnd-html5-backend";
import { formSelector, updateField } from "../../../_redux/formSlice";
import Item from "./_item";
import AddItem from "./_add";

export const OptionBuilder = (props) => {

    const { index } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { data } = useSelector(formSelector);

    const [item, setItem] = useState({});
    const [typeAttr, setTypeAttr] = useState(""); // contain single 

    useEffect(() => {

        if (typeof data.find === 'function') {
            const currentItem = data.find((i, k) => k === index);
            if(currentItem){
                setItem(currentItem);

                if ( typeof currentItem.attributes.find === 'function') {

                    const typeAttr = currentItem.attributes.find(attr => attr.name === 'type' && ['checkbox', 'radio'].includes(attr.value));
                    console.log('typeAttrtypeAttrtypeAttr', typeAttr);
                    setTypeAttr(typeAttr);
                }

            }
        }

        return () => {

        }
    }, [data, typeAttr, index]);


    useMemo(() => {
        const timer = setTimeout(() => {
            setIsLoading(true);
        }, 900);

        return () => clearTimeout(timer);
    }, []);

    const removeItem = (key) => {

        if (item) {
            dispatch(updateField({
                index, item: {
                    ...item,
                    options: [...item.options.filter((o, oKey) => oKey !== key)],
                }
            }));
        }
    }

    const moveItem = (dragIndex, hoverIndex) => {
        if (item) {
            const { options } = item;
            dispatch(updateField({
                index, item: {
                    ...item,
                    options: update(options, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, options[dragIndex]],
                        ],
                    }),
                }
            }));
        }
    }

    const onChange = (e, attrIndex) => {
        const { name, value } = e.target;

        let isBoolean = false;
        if (['disabled', 'readOnly'].includes(name)) {
            isBoolean = true;
        }

        if (item) {
            dispatch(updateField({
                index, item: {
                    ...item,
                    options: [...item.options.map((option, oKey) => {
                        if (attrIndex !== oKey) {
                            return option;
                        }
                        return {
                            ...option,
                            [name]: isBoolean ? value === 'true' : value,
                        }
                    })],
                }
            }));
        }
    }

    const onActiveChange = (key) => {
        setActiveIndex(prv => prv === key ? undefined : key);
    }

    // const getTitle = () => {
    //     let title = "Option Builder";

    //     // {t(item.tagName === 'select' ? 'Option Builder' : `${typeAttr.value.charAt(0).toUpperCase() + typeAttr.value.slice(1)} Builder`)}


    // }

    return (item && item.tagName === 'select') || (item && typeAttr) ? (
        <Accordion.Item eventKey="2">
            <Accordion.Header>
                {t(item.tagName === 'select' ? 'Option Builder' : `${typeAttr?.value?.charAt(0)?.toUpperCase() + typeAttr?.value?.slice(1)} Builder`)}
            </Accordion.Header>
            <Accordion.Body className="ifrom-option-builder">
                {isLoading ? (
                    <DndProvider backend={HTML5Backend}>
                        <Fragment>
                            {[...item.options].map((item, key) => (
                                <Item
                                    key={`index-${index}-${key}`}
                                    index={key}
                                    card={item}
                                    activeIndex={key === activeIndex}
                                    onActiveChange={onActiveChange}
                                    remove={removeItem}
                                    move={moveItem}
                                    onChange={onChange}
                                />
                            ))}
                            <AddItem index={index} />
                        </Fragment>
                    </DndProvider>
                ) : (
                    <div className="d-flex justify-content-center py-2">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}
            </Accordion.Body>
        </Accordion.Item>
    ) : null;
}