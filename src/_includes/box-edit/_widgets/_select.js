import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fieldPropertyChange, formSelector } from "../../../_redux/formSlice";
import GeneralAttrs from "../_attributes/_general";
import OptionalAttrs from "../_attributes/_optional";

export const SelectWidget = (props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)

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

            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">{t('Label')}</label>
                <div className="col-sm-9">
                    <input
                        name="label"
                        className="form-control"
                        value={item.label}
                        onChange={onChange}
                    />
                </div>
            </div>

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

            <GeneralAttrs index={index} />

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

        </Fragment>
    ) : null
}
