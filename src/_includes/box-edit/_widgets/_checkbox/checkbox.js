import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Row } from "react-bootstrap";
import { fieldPropertyChange, formSelector } from "../../../../_redux/formSlice";
import OptionalAttrs from "../../_attributes/_optional";
import GeneralCheckboxAttrs from "../../_attributes/_general-checkbox";

export const CheckboxWidget = (props) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)

    const options = [
        { value: 'checkbox', label: 'checkbox' },
        { value: 'radio', label: 'radio' },
    ];

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(fieldPropertyChange({
            index, name, value: value ? value : ""
        }));
    }

    return item ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Tag')}</label>
                <div className="col-sm-9">
                    <input
                        name="tagName"
                        className="form-control"
                        value={item.tagName}
                        disabled={true}
                    />
                </div>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Label')}</label>
                <div className="col-sm-9">
                    <Form.Control
                        name="label"
                        value={item.label}
                        onChange={onChange}
                    />
                </div>
            </Row>

            <GeneralCheckboxAttrs index={index} options={options} defaultType="checkbox" />

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

        </Fragment>
    ) : null
}
