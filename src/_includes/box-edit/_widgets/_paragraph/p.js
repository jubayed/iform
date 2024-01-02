import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fieldPropertyChange,  formSelector } from "../../../../_redux/formSlice";
import { Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OptionalAttrs from "../../_attributes/_optional";

export const ParagraphWidget = (props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (value !== undefined) {
            dispatch(fieldPropertyChange({
                index, name, value
            }));
        }
    }

    const sizes = [
        ...["", "fs-1", "fs-2", "fs-3", "fs-4", "fs-5", "fs-6"],
        ...["h1", "h2", "h3", "h4", "h5", "h6"],
        ...["display-1", "display-2", "display-3", "display-4", "display-5", "display-6"],
    ];

    return item !== undefined ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-3 col-form-label">{t('Tag')}</label>
                <div className="col">
                    <select
                        name="tagName"
                        className="form-select"
                        defaultValue={item.tagName}
                    >
                        {['p', 'span', 'strong', 'small'].map((h, key) =>
                            <option value={h} key={key}>{h}</option>
                        )}
                    </select>
                </div>
            </Row>

            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Text')}</label>
                <div className="col-sm-9">
                    <Form.Control as="textarea" rows={3}
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
                <label className="col-sm-3 col-form-label">{t("Size")}</label>
                <div className="col-sm-9">
                    <select name="size" className="form-select" value={item.size} onChange={onChange}>
                        {sizes.map((size, key) =>
                            <option value={size} key={key}>{size}</option>
                        )}
                    </select>
                </div>
            </Row>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t("Align")}</label>
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
