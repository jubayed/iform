
var { app } = window;
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
                return `col-${key}-${parentClass[key]}`;
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
            text: `{{ __('${source.label}') }}`,
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
        let addErClass = true;

        const [type, fieldName, value, id] = app.getAttributesValue(
            source.attributes,
            ['type', 'name', 'value', 'id'],
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
            addErClass = false;

            innerHTML = `{{ __('${innerHTML}') }}`
        }
        else if (['Hidden', 'Separator', 'Spacer', 'Paragraph', 'Header'].includes(source.name)) {
            tab_spaces = '';
            addErClass = false;
            innerHTML = `{{ __('${innerHTML}') }}`;
        }
        if (['checkbox', 'radio'].includes(type)) {
            innerHTML = '';


            if (options.length) {
                innerHTML = options.map((op, key) => {
                    const name = ` name="${fieldName}"`;
                    const value = op.value ? ` value="${op.value}"` : "";
                    const readOnly = op.readOnly ? ' read-only=""' : '';
                    const disabled = op.disabled ? ' disabled=""' : '';
                    const id = `${fieldName}Checkbox${key}`.replace('checkbox_checkbox', 'checkbox');
                    const checked = `{{ op.value === old('${fieldName}', ${variableName + fieldName}) ? ' checked=""' : ''}}`;

                    let innerHTML = '';
                    innerHTML += `${tab_spaces}<div class="form-check">\n`;
                    innerHTML += `${tab_spaces + tab_spaces}<input${name}${value}${readOnly}${disabled} type="${type}" class="form-check-input @error('${fieldName}') is-invalid @enderror" id="${id}" ${checked}/>\n`
                    innerHTML += `${tab_spaces + tab_spaces}<label class="form-check-label" for="${id}">\n`;
                    innerHTML += `${tab_spaces + tab_spaces}{{ __('${op.label}') }}\n`;
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

            innerHTML = `{{ old( '${fieldName}', ${variableName + fieldName}) }}`;

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
                    const selected = `{{ op.value === old('${fieldName}', ${variableName + fieldName}) ? ' selected=""'? '' }}`

                    return `    <option ${value}${readOnly}${disabled}${selected}>{{ __('${op.label}') }}</option>`;
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
        else if (['Separator', 'Header',].includes(source.name)) {
            if (source.size && source.size !== '') {
                attributes = [
                    {
                        name: 'class',
                        value: source.size,
                    }
                ]
            }
        }

        attributes = [...attributes.map(attribute => {
            if (attribute.name === 'value') {
                return {
                    ...attribute,
                    value: `{{ old('${fieldName}', ${variableName + fieldName}) }}`
                }
            } else if (attribute.name === 'class' && addErClass) {
                const { value } = attribute;
                return {
                    ...attribute,
                    value: `${value} @error('${fieldName}') is-invalid @enderror`
                }
            }

            return attribute
        })];

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

        const [type, fieldName] = app.getAttributesValue(
            source.attributes,
            ['type', 'name']
        );

        if (ignoreTags.includes(tagName) || source.hint === '' || text === undefined) {
            tagName = null;
        }
        else if (text && text !== '') {
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

        text = `${text}`.replace(/'/g, "\\'");
        text = `{{ __( '${text}' ) }}`;

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

        let tagName = 'div';

        const [fieldName] = app.getAttributesValue(
            source.attributes,
            ['name'],
            undefined
        );

        if (['Separator', 'Spacer', 'Paragraph', 'Header', 'Button', 'Buttons', 'Hidden'].includes(source.name)) {
            tagName = null;
        }

        const attributes = [
            {
                name: 'class',
                value: 'invalid-feedback',
            }
        ]

        return {
            beforeElement: `${tab_spaces}@error('${fieldName}')`,
            tab_spaces: `${tab_spaces}${tab_spaces}`,
            tagName: tagName,
            attributes: attributes,
            text: '{{ $message }}',
            afterElement: `${tab_spaces}@enderror`,
        }
    },

    /**
     * Returns an object with properties for wrapping elements.
     * @param {string} tab_spaces
     * @param {string} variableName
     * @param { array} fields
     * @returns {object} The wrapper object.
     */
    wrap: (tab_spaces, variableName, fields = []) => {

        return {
            tab_spaces: tab_spaces,
            beforeElement: '<form method="post" action="" class="row g-3">', // Comment: Represents content before the wrapped element.
            afterElement: '</form>', // Comment: Represents content after the wrapped element.
        };
    }
};