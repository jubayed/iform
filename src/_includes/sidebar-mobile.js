import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formSelector } from "../_redux/formSlice";
import { useTranslation } from "react-i18next";
import { names } from "./sidebar";

export const SidebarMobile = () => {

    const { LAST_USED_INDEX } = useSelector(formSelector);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // const addNewField = (item) => {
    //     dispatch(addField({
    //         index: LAST_USED_INDEX === null ? -1 : LAST_USED_INDEX,
    //         item
    //     }));
    // }

    return (
        <div className="input-group my-3">
            <select className="form-select">
                {names.map((name, key) => (
                    <option value={name.name} key={key}>{name.name}</option>
                ))}
            </select>
            <button className="input-group-text">
                {t("Insert Field")}
            </button>
        </div>
    )
}