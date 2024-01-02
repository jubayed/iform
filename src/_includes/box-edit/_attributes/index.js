import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { formSelector } from "../../../_redux/formSlice";
import Widgets from "../_widgets";

export const Attributes = (props) => {

    const { index } = props;
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index);

    const equalType = (name) => {
        return undefined !== item.attributes.find(attr => attr.name === 'type' && attr.value === name);
    }

    if (item === undefined) {
        return null;
    } 
    else if (item.name === 'Spacer') {
        return <Widgets.Br index={index} />
    }
    else if (item.name === 'Separator') {
        return <Widgets.Hr index={index} />
    }
    else if (item.name === 'Hidden') {
        return <Widgets.Hidden index={index} />
    }
    else if (item.name === 'Button') {
        return <Widgets.Button index={index} />
    }
    else if (item.tagName === 'textarea') {
        return <Widgets.TextArea index={index} />
    }
    else if (item.tagName === 'select') {
        return <Widgets.Select index={index} />
    }
    else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.tagName)) {
        return <Widgets.Heading index={index} />
    }
    else if (['p', 'strong', 'span', 'small'].includes(item.tagName)) {
        return <Widgets.Paragraph index={index} />
    }
    else if (equalType('text')) {
        return <Widgets.Text index={index} />
    }
    else if (equalType('number')) {
        return <Widgets.Number index={index} />
    }
    else if (equalType('date')) {
        return <Widgets.Date index={index} />
    }
    else if (equalType('time')) {
        return <Widgets.Time index={index} />
    } else if (equalType('email')) {
        return <Widgets.Email index={index} />
    }
    else if (equalType('password')) {
        return <Widgets.Password index={index} />
    } else if (equalType('checkbox')) {
        return <Widgets.Checkbox index={index} />
    }
    else if (equalType('radio')) {
        return <Widgets.Radio index={index} />
    }
    else if (equalType('file')) {
        return <Widgets.File index={index} />
    }
    else if (equalType('color')) {
        return <Widgets.Color index={index} />
    }
    else if (equalType('range')) {
        return <Widgets.Range index={index} />
    }
    else if (equalType('url')) {
        return <Widgets.Url index={index} />
    }
    else if (equalType('tel')) {
        return <Widgets.Tel index={index} />
    }
    else if (equalType('search')) {
        return <Widgets.Search index={index} />
    }
    return <Fragment />;
}
