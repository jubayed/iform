import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { setSetting, settingsSelector } from "../../../_redux/settingSlice";

export const ChangeLang = () => {

    const { APP_LANG, languages } = useSelector(settingsSelector);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        i18next.changeLanguage(value);
        dispatch(setSetting({ name, value }));
        window.localStorage.setItem('APP_LANG', value);
    }
    return (
        <Fragment>
            <label className="col-sm-5 col-form-label" htmlFor="settings-change-lang">{t('Language')}</label>
            <div className="col-sm-7">
                <select
                    name="APP_LANG"
                    value={APP_LANG}
                    onChange={onChange}
                    className="form-select form-control-sm"
                    id="settings-change-lang" >
                    {languages.map((lang, key) =>
                        <option value={lang.code} key={key}>{lang.native + ` - (${lang.name})`}</option>
                    )}
                </select>
            </div>
        </Fragment>
    );
}