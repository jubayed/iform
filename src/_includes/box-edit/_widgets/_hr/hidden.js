import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { formSelector } from "../../../../_redux/formSlice";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GeneralAttrs from "../../_attributes/_general";

export const HiddenWidget = (props) => {

    const { t } = useTranslation();
    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)

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
            
            <GeneralAttrs index={index} />

        </Fragment>
    ) : null
}
