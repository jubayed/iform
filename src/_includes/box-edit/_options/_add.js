import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formSelector, updateField } from "../../../_redux/formSlice";

const AddItem = (props) => {

    const { index } = props;
    const {t} = useTranslation();
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index);
    const dispatch = useDispatch();

    const addItem = event => {
        event.preventDefault();

        const newOption = {
            label: 'Label',
            value: 'Value',
            disabled: false,
            readOnly: false,
        }

        dispatch(updateField({
            index,
            item: {
                ...item,
                options: [
                    ...item.options,
                    newOption,
                ]
            }
        }));
    }

    return item ? (
        <Card className="card-body">
            <div className="d-grid gap-2">
                <Button onClick={addItem}>
                    {t("Add Option")}
                </Button>
            </div>
        </Card>
    ) : null;
}

export default AddItem;