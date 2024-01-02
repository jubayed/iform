import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSetting, settingsSelector } from "../../../_redux/settingSlice";
import { ChangeLang } from "./_lang";
import Touch from "./_touch";

export const SettingComponet = () => {

    const { APP_CONTAINER, CODE_HIGHLIGHT } = useSelector(settingsSelector);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setSetting({ name, value }));
    }

    return (
        <Fragment>
            <Row className="mb-2 py-1">
                <Touch />
            </Row>

            <Row className="mb-2 py-1">
                <ChangeLang />
            </Row>

            <Row className="mb-2 py-1">
                <label className="col-sm-5 col-form-label">{t("Container")}</label>
                <div className="col-sm-7">
                    {APP_CONTAINER ? (
                        <select
                            name="APP_CONTAINER"
                            value={APP_CONTAINER}
                            onChange={onChange}
                            className="form-select form-control-sm"
                        >
                            <option value="container">{t("Boxed")}</option>
                            <option value="container-fluid">{t("Wide")}</option>
                            <option value="container-off">{t("Full")}</option>
                        </select>
                    ) : null}
                </div>
            </Row>

            <Row className="mb-2 py-1">
                <label className="col-sm-5 col-form-label">{t("Code Highligh")}</label>
                <div className="col-sm-7">
                    {CODE_HIGHLIGHT ? (
                        <select
                            name="CODE_HIGHLIGHT"
                            value={CODE_HIGHLIGHT}
                            onChange={onChange}
                            className="form-select form-control-sm"
                        >
                            <option value="no">{t("Default No")}</option>
                            <option value="highlighter">{t("highlighter")}</option>
                        </select>
                    ) : null}
                </div>
            </Row>

        </Fragment>
    )
}