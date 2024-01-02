import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fieldPropertyChange, formSelector } from "../../../../_redux/formSlice";
import OptionalAttrs from "../../_attributes/_optional";
import GeneralAttrs from "../../_attributes/_general";

export const TextWidget = (props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index);

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(fieldPropertyChange({
            index, name, value: value ? value : ""
        }));
    }

    const options = [
        { value: 'text', label: 'text' },
        { value: 'number', label: 'number' },
        { value: 'date', label: 'date' },
        { value: 'time', label: 'time' },
        { value: 'email', label: 'email' },
        { value: 'password', label: 'password' },
        { value: 'file', label: 'file' },
        { value: 'color', label: 'color' },
        { value: 'range', label: 'range' },
        { value: 'url', label: 'url' },
        { value: 'tel', label: 'tel' },
        { value: 'search', label: 'search' },
    ];

    return item !== undefined ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Tag')}</label>
                <Col sm="9">
                    <Form.Control
                        name="tagName"
                        defaultValue={item.tagName}
                        disabled={true}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Label')}</label>
                <Col sm="9">
                    <Form.Control
                        name="label"
                        defaultValue={item.label}
                        onChange={e => onChange(e)}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Form Text')}</label>
                <div className="col-sm-9">
                    <Form.Control as="textarea" rows={3}
                        name="hint"
                        value={item.hint}
                        onChange={onChange}
                    />
                </div>
            </Row>

            <GeneralAttrs index={index} options={options} defaultType="text" />

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

        </Fragment>
    ) : null
}
