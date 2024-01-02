import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fieldPropertyChange, formSelector } from "../../../_redux/formSlice";
import OptionalAttrs from "../_attributes/_optional";

export const ButtonWidget = (props) => {

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

    const variants = [
        ...["primary", "secondary", "success", "warning", "danger", "info", "light", "dark", "link"],
        ...['outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light']
    ];

    return item !== undefined ? (
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
                <label className="col-sm-3 col-form-label">{t("Text")}</label>
                <div className="col-sm-9">
                    <input
                        name="text"
                        className="form-control"
                        value={item.text}
                        onChange={e => onChange(e)}
                    />
                </div>
            </Row>

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Variant')}</label>
                <div className="col-sm-9">
                    <select name="variant" className="form-select" value={item.variant} onChange={onChange}>
                        {variants.map((variant, key) =>
                            <option value={variant} key={key}>{variant}</option>
                        )}
                    </select>
                </div>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Size')}</label>
                <div className="col-sm-9">
                    <select name="size" className="form-select" value={item.size} onChange={onChange}>
                        {["sm", "md", "lg",].map((size, key) =>
                            <option value={size} key={key}>{size}</option>
                        )}
                    </select>
                </div>
            </Row>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Align')}</label>
                <div className="col-sm-9">
                    <select name="align" className="form-select" value={item.align} onChange={onChange}>
                        {["start", "center", "end"].map((align, key) =>
                            <option value={align} key={key}>{align}</option>
                        )}
                    </select>
                </div>
            </Row>

        </Fragment>
    ) : null
}
