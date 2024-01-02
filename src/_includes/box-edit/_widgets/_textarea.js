import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fieldPropertyChange, formSelector, onChangeAttr } from "../../../_redux/formSlice";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OptionalAttrs from "../_attributes/_optional";

export const TextAreaWidget = (props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)
    const [attrName, attrValue] = item.attributes;

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(fieldPropertyChange({
            index, name, value: value ? value : ""
        }));
    }

    const onAttrChange = (e, attrKey) => {
        e.preventDefault();
        const { value } = e.target;

        dispatch(onChangeAttr({
            index, attrKey, name: 'value', value,
        }));
    }

    return item !== undefined ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-sm-3 col-form-label">{t('Tag')}</label>
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
                        defaultValue={item.label}
                        onChange={e => onChange(e)}
                    />
                </div>
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

            <Row className="border-bottom mb-2">
                <h5>{t("Attributes")}</h5>
            </Row>
            
            {attrName ? (
                <Row className="mb-3">
                    <label className="col-sm-3 col-form-label">{t('Name')}</label>
                    <Col sm="9">
                        <input
                            name="name"
                            value={attrName.value}
                            onChange={e => onAttrChange(e, 0)}
                            className="form-control"
                        />
                    </Col>
                </Row>
            ) : null}

            {attrValue ? (
                <Row className="mb-3">
                    <label className="col-sm-3 col-form-label">{t('Value')}</label>
                    <Col sm="9">
                        <Form.Control as="textarea" rows={3}
                            name="value"
                            value={attrValue.value}
                            onChange={(e) => onAttrChange(e, 1)}
                        />
                    </Col>
                </Row>
            ) : null}

            {item.optional_attributes.length ? (
                <OptionalAttrs index={index} />
            ) : null}

        </Fragment>
    ) : null
}
