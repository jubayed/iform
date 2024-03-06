var { app } = window

// dont change "__addon___" name
// eslint-disable-next-line no-unused-vars
var __addon__ = {

    /**
     * 
     * @param {*} source 
     * @param {string} tab_spaces
     * @param {string} variableName
     * @returns 
     */
    parent: (source, tab_spaces, variableName) => {

        let tagName = 'div';
        let attributes = [];

        const { parentClass } = source;

        const [type] = app.getAttributesValue(
            source.attributes,
            ['type'],
            undefined
        );

        if (type === 'hidden') {
            tagName = null;
        }
        else if (['Spacer', 'Separator'].includes(source.name)) {
            tagName = null;
        }
        else if (tagName !== null) {
            let classLine = Object.keys(parentClass).filter(key => {
                return parentClass[key] !== '';
            }).map(key => {

                // bootstrap col-sm-12 
                const colNum = parentClass[key];
                const kv = {
                    xs: 'col-xs',
                    sm: 'col-sm',
                    md: 'col-md',
                    lg: 'col-lg',
                    xlg: 'col-xlg',
                    xxlg: 'col-xxlg',
                };

                const col = {
                    "1": `1`,
                    "2": `2`,
                    "3": `3`,
                    "4": `4`,
                    "5": `5`,
                    "6": `6`,
                    "7": `7`,
                    "8": `8`,
                    "9": `9`,
                    "10": `10`,
                    "11": `11`,
                    "12": `12`,
                }

                return `${kv[key]}-${col[colNum]}`;
            }).join(' ');

            if (classLine === '') {
                classLine = 'col-sm-12';
            }

            attributes = [
                {
                    name: 'class',
                    value: `${classLine}`
                }
            ]
        }

        return {
            beforeElement: null,
            comment: null,
            tagName: tagName,
            attributes: attributes,
            afterElement: null,
        }
    },

    /**
     * 
     * @param {*} source 
     * @param {string} tab_spaces
     * @param {string} variableName
     * @returns 
     */
    label: (source, tab_spaces, variableName) => {

        const ignoreTags = ['br', 'hr', 'button', 'div', 'p', 'small', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li',];

        let tagName = 'label';
        const { name } = source;

        const [type, fieldName] = app.getAttributesValue(
            source.attributes,
            ['type', 'name'],
            undefined
        );

        let attributes = [
            {
                name: 'class',
                value: 'form-label',
            },
            {
                name: 'for',
                value: `${fieldName}Field`,
            },
        ];

        if (type === 'hidden') {
            tagName = null;
        }
        else if (['Spacer', 'Separator'].includes(name)) {
            tagName = null;
        }
        else if (ignoreTags.includes(source.tagName)) {
            tagName = null;
        }
        else if (['checkbox', 'radio'].includes(type)) {

            tagName = 'div';
            if (source.label === '') {
                tagName = null;
            }

            attributes = [...attributes.filter(attr => attr.name !== 'for')];
        }

        return {
            beforeElement: null,
            comment: null,
            tagName: tagName,
            attributes: attributes,
            text: source.label,
            afterElement: null,
        }
    },

    /**
     * 
     * @param {object} source 
     * @param {string} tab_spaces
     * @param {string} variableName
     * @return {object}
     */
    main: (source, tab_spaces, variableName) => {

        let beforeElement = '';
        let afterElement = '';
        let { tagName, attributes, size, options, } = source;
        let innerHTML = source.text ? source.text : '';

        const [type, fieldName, value, id] = app.getAttributesValue(
            source.attributes,
            ['type', 'name', 'value', 'id'],
            undefined
        );

        if (['Button', 'Paragraph', 'Header'].includes(source.name)) {
            beforeElement = `${tab_spaces}<div class="d-flex justify-content-${source.align}">`;
            afterElement = `${tab_spaces}</div>`;
        }

        if (source.name === 'Button') {
            size = size === 'md' ? '' : ` btn-${size}`;
            attributes = [
                ...attributes,
                {
                    name: 'class',
                    value: `btn btn-${source.variant}${size}`
                }
            ];
        }
        else if (['Hidden', 'Separator', 'Spacer'].includes(source.name)) {
            tab_spaces = '';
        }

        if (['checkbox', 'radio'].includes(type)) {
            innerHTML = '';


            if (options.length) {
                innerHTML = options.map((op, key) => {
                    const name = ` name="${fieldName}"`;
                    const value = op.value ? ` value="${op.value}"` : "";
                    const readOnly = op.readOnly ? ' read-only=""' : '';
                    const disabled = op.disabled ? ' disabled=""' : '';
                    const id = `${fieldName}Checkbox${key}`.replace('checkbox_checkbox', 'checkbox')

                    let innerHTML = '';
                    innerHTML += `${tab_spaces}<div class="form-check">\n`;
                    innerHTML += `${tab_spaces + tab_spaces}<input${name}${value}${readOnly}${disabled} type="${type}" class="form-check-input" id="${id}" />\n`
                    innerHTML += `${tab_spaces + tab_spaces}<label class="form-check-label" for="${id}">\n`;
                    innerHTML += `${tab_spaces + tab_spaces}${op.label}\n`;
                    innerHTML += `${tab_spaces + tab_spaces}</label>\n`
                    innerHTML += `${tab_spaces}</div>\n`;

                    return innerHTML;
                }).join('\n') + "";
            }
        }
        else if (tagName === 'input') {

            if (size && size !== 'md') {
                size = ` form-control-${size}`;
            } else {
                size = '';
            }

            attributes = [
                ...attributes,
                ...[
                    {
                        name: 'class',
                        value: `form-control${size}`
                    },
                    {
                        name: 'id',
                        value: `${fieldName}Field`,
                    }
                ],
                ...app.ariaDescribedby(source),
            ];
        }
        else if (source.tagName === 'textarea') {
            attributes = [
                ...attributes,
                {
                    name: 'class',
                    value: `form-control`
                },
                {
                    name: 'rows',
                    value: '3'
                },
                {
                    name: 'id',
                    value: id ? id : `${fieldName}Field`,
                },
                ...app.ariaDescribedby(source),
            ];

            innerHTML = value ? value : '';

            attributes = [...attributes.filter(item => {
                return item.name !== 'value';
            })];
        }
        else if (['select'].includes(tagName)) {
            innerHTML = "";
            if (options.length) {
                innerHTML = options.map(op => {
                    let readOnly = op.readOnly ? ' read-only=""' : '';
                    let disabled = op.disabled ? ' disabled=""' : '';
                    const value = op.value ? `value="${op.value}"` : "";

                    return `    <option ${value}${readOnly}${disabled}>${op.label}</option>`;
                }).join('\n') + '\n';
            }

            attributes = [
                {
                    name: 'class',
                    value: 'form-select',
                },
                {
                    name: 'id',
                    value: id ? id : `${fieldName}Field`,
                },
                ...app.ariaDescribedby(source),
            ]
        }
        else if (['p', 'small', 'span', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            if (source.size !== '') {
                attributes = [
                    {
                        name: 'class',
                        value: source.size,
                    }
                ]
            }
        }

        return {
            beforeElement: beforeElement,
            tagName: tagName,
            attributes: attributes,
            innerHTML: innerHTML,
            afterElement: afterElement,
        }
    },

    /**
     * 
     * @param {*} source 
     * @param {string} tab_spaces
     * @param {string} variableName
     * @returns 
     */
    hint: (source, tab_spaces, variableName) => {

        const ignoreTags = ['br', 'hr', 'button', 'div', 'p', 'small', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li',];
        let tagName = 'div';
        let text = source.hint;
        let attributes = [];

        const [fieldName] = app.getAttributesValue(
            source.attributes,
            ['name']
        );

        if (ignoreTags.includes(tagName) || source.hint === '') {
            tagName = null;
        }

        if (text && text !== '') {
            attributes = [
                {
                    name: 'id',
                    value: `${fieldName}Help`
                },
                {
                    name: 'class',
                    value: 'form-text',
                },
            ]
        }

        return {
            beforeElement: '',
            tagName: tagName,
            attributes: attributes,
            text: text,
            afterElement: '',
        }
    },

    /**
     * 
     * @param {*} source 
     * @param {string} tab_spaces
     * @param {string} variableName
     * @returns 
     */
    error: (source, tab_spaces, variableName) => {

        return {
            beforeElement: '',
            tagName: null,
            attributes: '',
            text: '',
            afterElement: '',
        }
    },

    /**
     * Returns an object with properties for wrapping elements.
     * @param {string} tab_spaces
     * @param {string} variableName
     * @returns {object} The wrapper object.
     */
    wrap: (tab_spaces, variableName, fields = []) => {

        return {
            tab_spaces: tab_spaces,
            beforeElement: '<form class="row g-3">', // Comment: Represents content before the wrapped element.
            afterElement: '</form>', // Comment: Represents content after the wrapped element.
        };
    }
};