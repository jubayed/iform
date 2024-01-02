import { Fragment, useEffect, useState } from "react";
import { createElement } from "react";

export const FormFiled = (props) => {
    const { item } = props;
    const [attributes, setAttributes] = useState();

    const hasHint = item && item.hint && item.hint.length > 0;

    useEffect(() => {
        if (item) {
            // toAttributes().then(attributes => {
            //     setAttributes(attributes)-++

            // });
            setAttributes(item.attributes)
        }

    }, [item]);
    // const attributes  = [...item.attributes, ...item.optional_attributes];

    const equalType = (name) => {
        return undefined !== item.attributes.find(attr => attr.name === 'type' && attr.value === name);
    }


    if (attributes === undefined) {
        return createElement(
            'div',
            {},
            "Generating block ...",
        )
    }
    else if (item.name === 'Spacer') {
        return createElement(
            'br',
        )
    }
    else if (item.name === 'Separator') {
        return createElement(
            'hr',
        )
    }
    else if (item.name === 'Hidden') {
        return createElement(
            Fragment,
            null,
            createElement('label', { className: 'form-label mt-2 iForm-hidden' }, 'Hidden'),
            createElement('input', {
                type: 'hidden',
                name: attributes.name,
                defaultValue: attributes.value,
                className: 'form-control',
            })
        )
    }
    else if ('button' === item.tagName) {
        let className = `btn btn-${item.variant}${item.size === 'md' ? '' : ' btn-' + item.size}`
        return createElement(
            'div',
            { className: `d-flex justify-content-${item.align}` },
            createElement(
                item.tagName,
                {
                    className,
                },
                item.text
            ),
        )
    }
    else if (item.tagName === 'textarea') {
        return createElement(
            Fragment,
            null,
            createElement('label', { className: 'form-label' }, item.label),
            createElement('textarea', {
                id: attributes.id,
                //attribute
                name: attributes.name,
                defaultValue: attributes.value,
                placeholder: attributes.placeholder,
                className: 'form-control',
            }),
            createElement(hasHint ===false ? Fragment : 'div', hasHint ? {
                className: 'form-text'
            } : null, item.hint),
        )
    }
    else if (equalType('checkbox') || equalType('radio')) {
        return createElement(
            'div',
            { className: '' },
            createElement('div', {}, item.label),
            createElement(
                'div',
                {},
                item.options.map((option, key) => {
                    return createElement('div', { className: 'form-check', key }, createElement(
                        Fragment,
                        null,
                        createElement('input', {
                            className: 'form-check-input',
                            type: equalType('checkbox') ? 'checkbox' : 'radio',
                            defaultValue: option.value,
                        }, null),
                        createElement('label', { className: 'form-check-label' }, option.label),
                    ))
                })
            ),
            createElement(hasHint === false ? Fragment : 'div', hasHint ? {
                className: 'form-text'
            } : null, item.hint),
        )
    }
    else if (item.tagName === 'input') {

        const attributeObject = {};

        attributes.forEach(attribute => {
            if(attribute.name === 'value'){
                attributeObject['defaultValue'] = attribute.value;
            }else{
                attributeObject[attribute.name] = attribute.value;
            }
        });

        return createElement(
            Fragment,
            null,
            createElement('label', { className: 'form-label' }, item.label),
            createElement('input', {
                ...attributeObject,
                className: 'form-control',
            }),
            createElement(hasHint === false ? Fragment : 'div', hasHint ? {
                className: 'form-text'
            } : null, item.hint),
        )
    }
    else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.tagName)) {
        let className = `${item.size}`

        return createElement(
            'div',
            { className: `d-flex justify-content-${item.align}` },
            createElement(
                item.tagName,
                {
                    className,
                },
                item.text
            ),
        )
    }
    else if (['p', 'span', 'strong', 'small'].includes(item.tagName)) {
        let className = `${item.size}`

        return createElement(
            'div',
            { className: `d-flex justify-content-${item.align}` },
            createElement(
                item.tagName,
                {
                    className,
                },
                item.text
            ),
        )
    }
    else if (item.tagName === 'select') {
        return createElement(
            Fragment,
            null,
            createElement('label', { className: 'form-label' }, item.label),
            createElement('select', {
                id: attributes.id,
                name: attributes.name,
                defaultValue: attributes.defaultValue,
                value: attributes.value,
                placeholder: attributes.placeholder,
                className: 'form-select',
            },
                [...[...item.options].map((option, key) => {
                    return createElement('option', { value: option, key }, option.label)
                })]
            ),
            createElement(hasHint === false ? Fragment : 'div', hasHint ? {
                className: 'form-text'
            } : null, item.hint),
        )
    }

    return null;
}