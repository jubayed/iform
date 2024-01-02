import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OptionalAttrs from "../../_attributes/_optional";
import GeneralAttrs from "../../_attributes/_general";
import { fieldPropertyChange, formSelector } from "../../../../_redux/formSlice";

export const TelWidget = (props) => {

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
    return item ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t("Tag")}</label>
                <div className="col-sm-9">
                    <input
                        name="tagName"
                        className="form-control"
                        defaultValue={item.tagName}
                        disabled={true}
                    />
                </div>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Label')}</label>
                <div className="col-sm-9">
                    <input
                        name="label"
                        className="form-control"
                        value={item.label}
                        onChange={onChange}
                    />
                </div>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Form Text')}</label>
                <div className="col-sm-9">
                    <input
                        name="hint"
                        className="form-control"
                        value={item.hint}
                        onChange={onChange}
                    />
                </div>
            </Row>

            <GeneralAttrs index={index} options={options} defaultType="tel" />

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

        </Fragment>
    ) : null
}
