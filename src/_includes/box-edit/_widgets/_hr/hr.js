import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { formSelector } from "../../../../_redux/formSlice";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const HrWidget = (props) => {

    const { index } = props;
    const {t} = useTranslation();
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index)

    return item !== undefined ? (
        <Fragment>
            <Row className="mb-3">
                <label className="col-3 col-form-label">{t("Tag")}</label>
                <div className="col">
                    <select
                        name="tagName"
                        className="form-select"
                        value={item.tagName}
                        disabled={true}
                    >
                        {['hr'].map((h, key) =>
                            <option value={h} key={key}>{h}</option>
                        )}
                    </select>
                </div>
            </Row>
        </Fragment>
    ) : null
}
