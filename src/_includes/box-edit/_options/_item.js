import React, { Fragment, useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { FiArrowDown, FiArrowRight, FiX } from "react-icons/fi";

const style = {
    border: '1px dashed gray',
    padding: '0.2rem',
    marginBottom: '.1rem',
    backgroundColor: 'white',
}

const Item = (props) => {

    const { t } = useTranslation();
    const { index, card, activeIndex } = props;
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'OPTION_ITEM',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
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

            // Time to actually perform the action
            // dispatch(moveField({ dragIndex, hoverIndex }));
            props.move(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'OPTION_ITEM',
        item: () => {
            return { index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref))
    return (
        <Fragment>
            {card ? (
                <Card className="m-0" handlerId={handlerId} ref={ref} style={{ ...style, opacity }}>
                    <Card.Header className="d-flex justify-content-between" onClick={() => props.onActiveChange(index)}>
                        <div className="move-item w-100">
                            {card.label}
                        </div>
                        <div className="d-flex">
                            <Button size="sm" variant="danger" className="mx-1" onClick={() => props.remove(index)}>
                                <FiX />
                            </Button>
                            <Button size="sm">
                                {activeIndex ? <FiArrowDown /> : <FiArrowRight />}
                            </Button>
                        </div>
                    </Card.Header>
                    {activeIndex ? (
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3" controlId="iframe-option-builder.lable">
                                <Form.Label column sm="3">
                                    {t("Label")}
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control name="label" value={card.label} onChange={e => props.onChange(e, index)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="iframe-option-builder.value">
                                <Form.Label column sm="3">
                                    {t("Value")}
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control name="value" value={card.value} onChange={e => props.onChange(e, index)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                {card.disabled ? (
                                    <Form.Check
                                        name="disabled"
                                        value="false"
                                        type="checkbox"
                                        id={`iframe-option-builder.disabled.${index}`}
                                        label={t("Disabled")}
                                        onChange={e => props.onChange(e, index)}
                                        checked={true}
                                    />
                                ) : (
                                    <Form.Check
                                        name="disabled"
                                        value="true"
                                        type="checkbox"
                                        id={`iframe-option-builder.disabled.${index}`}
                                        label={t("Disabled")}
                                        onChange={e => props.onChange(e, index)}

                                    />
                                )}

                                {card.readOnly ? (
                                    <Form.Check
                                        name="readOnly"
                                        value="false"
                                        type="checkbox"
                                        id={`iframe-option-builder.readOnly.${index}`}
                                        label={t("ReadOnly")}
                                        onChange={e => props.onChange(e, index)}
                                        checked={true}
                                    />
                                ) : (
                                    <Form.Check
                                        name="readOnly"
                                        value="true"
                                        type="checkbox"
                                        id={`iframe-option-builder.readOnly.${index}`}
                                        label={t("ReadOnly")}
                                        onChange={e => props.onChange(e, index)}

                                    />
                                )}

                            </Form.Group>
                        </Card.Body>
                    ) : null}
                </Card>
            ) : null}
        </Fragment>
    );
}

export default Item;