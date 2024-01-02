
const parentClass = {
    xs: '',
    sm: '12',
    md: '',
    lg: '',
    xl: '',
    xxl: ''
};

export const boxTypes = [
    {
        name: "Text",
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameText',
                valueType: 'text',
            },
            {
                name: 'value',
                value: '',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'text',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },

            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'readonly',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
        ],
        label: 'Text',
        size: "md",
    },
    {
        name: 'Textarea',
        tagName: 'textarea',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameTextarea',
                valueType: 'text',
            },
            {
                name: 'value',
                value: 'textarea value',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: true,
            },
            {
                name: 'readonly',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
        ],
        label: 'Textarea',
    },
    {
        name: 'Hidden',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameHidden',
                valueType: 'text',
            },
            {
                name: 'value',
                value: '',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'hidden',
                valueType: 'text',
            },
        ],
        optional_attributes: [
        ],
    },
    {
        name: 'Number',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameNumber',
            },
            {
                name: 'value',
                value: '',
            },
            {
                name: 'type',
                value: 'number',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },

            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'min',
                value: '',
                valueType: 'number',
                required: false,
            },
            {
                name: 'max',
                value: '',
                valueType: 'number',
                required: false,
            },
            {
                name: 'readonly',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },

        ],
        label: 'Number',
        size: "md",
    },
    {
        name: 'Button',
        tagName: 'button',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'type',
                value: 'button',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
        ],
        align: 'end',
        variant: 'primary',
        size: 'md',
        text: 'Button'
    },
    {
        name: 'Date',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameDate',
                valueType: 'text',
            },
            {
                name: 'value',
                value: '',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'date',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'readonly',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'required',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
        ],
        label: 'Date',
        size: "md",
    },
    {
        name: 'File',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameFile',
                valueType: 'text',
            },
            {
                name: 'value',
                value: '',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'file',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'readonly',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'required',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'multiple',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'accept',
                value: '',
                valueType: 'text',
                required: false,
            },
        ],
        label: 'File',
        size: "md",
    },
    {
        name: 'Header',
        tagName: 'h3',
        parentClass,
        comment: "",
        align: 'start',
        attributes: [

        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            }
        ],
        text: 'header h3 tag'
    },
    {
        name: 'Paragraph',
        tagName: 'p',
        parentClass,
        comment: "",
        align: 'start',
        size: "",
        attributes: [
        ],
        optional_attributes: [
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
        ],
        text: 'Lorem Ipsum',
    },
    {
        name: 'Select',
        tagName: 'select',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameSelect',
                valueType: 'text',
            },
            {
                name: 'value',
                value: '',
                valueType: 'text',
            },
        ],
        optional_attributes: [
            {
                name: 'id',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'class',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'placeholder',
                value: '',
                valueType: 'text',
                required: false,
            },
            {
                name: 'required',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'disabled',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'autofocus',
                value: false,
                valueType: 'boolean',
                required: false,
            },
            {
                name: 'multiple',
                value: false,
                valueType: 'boolean',
                required: false,
            },
        ],
        label: 'Select',
        options: [
            {
                label: "option 1",
                value: 'option-1',
                disabled: false,
                readOnly: false,
            },
            {
                label: "option 2 ",
                value: 'option-2',
                disabled: false,
                readOnly: false,
            },
        ],
        size: "md",
    },
    {
        name: 'Checkbox',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameCheckbox',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'checkbox',
                valueType: 'text',
            },
        ],
        optional_attributes: [

        ],
        options: [
            {
                label: "Default checkbox ",
                value: 'on',
                disabled: false,
                readOnly: false,
            },
            {
                label: "Default checkbox ",
                value: 'on',
                disabled: false,
                readOnly: false,
            },
        ],
        label: 'Checkbox',
    },
    {
        name: 'Radio',
        tagName: 'input',
        parentClass,
        comment: "",
        hint: '',
        attributes: [
            {
                name: 'name',
                value: 'nameRadio',
                valueType: 'text',
            },
            {
                name: 'type',
                value: 'radio',
                valueType: 'text',
            },
        ],
        optional_attributes: [
        ],
        options: [
            {
                label: "Default checkbox ",
                value: 'on',
                disabled: false,
                readOnly: false,
            },
            {
                label: "Default checkbox ",
                value: 'on',
                disabled: false,
                readOnly: false,
            },
        ],
        label: 'Radio',
    },
    {
        name: 'Separator',
        tagName: 'hr',
        parentClass,
        comment: "",
        hint: '',
        attributes: [],
        optional_attributes: [
        ],
    },
    {
        name: 'Spacer',
        tagName: 'br',
        parentClass,
        comment: "",
        hint: '',
        attributes: [

        ],
        optional_attributes: [

        ],
    },
]
