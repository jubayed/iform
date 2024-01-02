import { app } from './global';

class BlockClass {

    /**
     * Field item or single form field block
     * 
     * @var {object}
     */
    source;

    /**
     * line tab spaces
     * 
     * @var {string}
     */
    tab_spaces;

    /**
     * variableName contains the name of the variable of input field.
     * 
     * @var {string|undefined}
     */
    variableName;

    /**
     * 
     */
    #block = {
        parentElement: {
            tagName: 'div',
            attributes: [],
            comment: null,
            beforeElement: null,
            afterElement: null,
            startLine: function () {
                let line = '';
                if (this.beforeElement) {
                    line += this.beforeElement + "\n";
                }

                if (this.comment) {
                    line = this.comment + "\n";
                }

                if (this.tagName === null) {
                    return '';
                }

                const attr_line = app.attributeToString(this.attributes);

                return `${line}<${this.tagName}${attr_line}>\n`;
            },
            endLine: function () {
                if (this.tagName === null) {
                    return "";
                }
                let line = `</${this.tagName}>`;

                if (this.afterElement && this.afterElement !== '') {
                    line += this.afterElement + "";
                }

                return line;
            }
        },

        labelElement: {
            beforeElement: null,
            comment: null,
            tagName: null,
            attributes: [],
            text: '',
            afterElement: null,
            startLine: function () {

                // tab or tab character
                const { tab_spaces } = this;
                let line = '';

                if (this.beforeElement) {
                    line += this.beforeElement + "\n";
                }

                if (this.comment) {
                    line = this.comment + "\n";
                }

                if (this.tagName === null) {
                    return '';
                }

                const attr_line = app.attributeToString(this.attributes);

                return `${line}${tab_spaces}<${this.tagName}${attr_line}>`;
            },
            childrenLine: function () {

                if (this.tagName === null) {
                    return "";
                }

                return this.text ? this.text : '';
            },
            endLine: function () {

                if (this.tagName === null) {
                    return "";
                }
                let line = `</${this.tagName}>\n`;

                if (this.afterElement) {
                    line += "\n" + this.afterElement + "\n";
                }

                return line;
            }
        },

        formTagElement: {
            tagName: 'input',
            attributes: [],
            beforeElement: null,
            afterElement: null,
            innerHTML: '',
            startLine: function () {
                let line = '';
                let { tab_spaces } = this;
                let newLine = '\n';

                if (this.beforeElement) {
                    line += this.beforeElement + "\n";
                }
                let [type] = app.getAttributesValue(this.attributes, ['type'], null);

                if (this.tagName === null || ['checkbox', 'radio'].includes(type)) {
                    return '';
                }

                if (['br', 'hr'].includes(this.tagName)) {
                    return `<${this.tagName}/>`
                }


                if (type === 'hidden') {
                    tab_spaces = '';
                    newLine = '';
                }
                else if (['button', 'p', 'small', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.tagName)) {
                    newLine = '';
                    tab_spaces = tab_spaces + tab_spaces;
                }
                else if (['textarea'].includes(this.tagName)) {
                    newLine = '';
                }

                const self_closing = app.isSelfClose(this.tagName);
                const attr_line = app.attributeToString(this.attributes);

                let content = `${line}${tab_spaces}<${this.tagName}${attr_line}${self_closing ? '/>' : ">"}`;

                return content + newLine;
            },
            childrenLine: function () {
                let { tab_spaces } = this;
                let [type] = app.getAttributesValue(this.attributes, ['type'], null);

                if (['checkbox', 'radio'].includes(type)) {
                    return this.innerHTML;
                }
                else if ([null, 'hr', 'br'].includes(this.tagName) || app.isSelfClose(this.tagName)) {
                    return "";
                }

                let newLine = '';

                if (['hidden', 'checkbox', 'radio'].includes(type)) {
                    return "";
                }
                else if (['textarea', 'button', 'p', 'small', 'strong', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.tagName)) {
                    return this.innerHTML;
                }

                let content = [...this.innerHTML.split('\n').map(line => `${tab_spaces}${line}`)].join('\n');

                return content + newLine;
            },
            endLine: function () {

                let { tab_spaces } = this;

                if ([null, 'br', 'hr'].includes(this.tagName) || app.isSelfClose(this.tagName)) {
                    return `${this.afterElement}\n`;
                }

                if (['button', 'p', 'small', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.tagName)) {
                    tab_spaces = '';
                }
                else if (['select', 'textarea'].includes(this.tagName)) {
                    tab_spaces = '';
                }

                let line = `${tab_spaces}</${this.tagName}>\n`;

                if (this.afterElement) {
                    line += this.afterElement + "\n";
                }

                return line;
            }
        },

        errorElement: {
            beforeElement: null,
            tagName: 'div',
            attributes: [],
            text: '',
            afterElement: null,
            startLine: function () {
                let line = '';
                let {tab_spaces} = this;

                if (this.beforeElement) {
                    line += this.beforeElement + "\n";
                }

                if (this.tagName === null) {
                    return '';
                }

                const attr_line = app.attributeToString(this.attributes);

                return `${line}${tab_spaces}<${this.tagName}${attr_line}>`;
            },
            childrenLine: function () {
                const { tagName, text } = this;

                if (tagName === null || (text && text === '')) {
                    return "";
                }
                return this.text;
            },
            endLine: function () {
                if (this.tagName === null) {
                    return "";
                }
                let line = `</${this.tagName}>\n`;
                if (this.afterElement) {
                    line += this.afterElement + "\n";
                }
                return line;
            }
        },

        hintElement: {
            beforeElement: null,
            tagName: 'div',
            attributes: [],
            text: '',
            afterElement: null,
            startLine: function () {
                let line = '';
                let { tab_spaces } = this;

                if (this.beforeElement) {
                    line += this.beforeElement + "\n";
                }

                if (!this.text) {
                    return '';
                }

                if ([null, 'p', 'br', 'hr', 'small', 'span'].includes(this.tagName)) {
                    return '';
                }

                const attr_line = app.attributeToString(this.attributes);
                return `${line}${tab_spaces}<${this.tagName}${attr_line}>`;
            },
            childrenLine: function () {
                if (this.tagName === null) {
                    return "";
                }
                if (!this.text) {
                    return '';
                }
                return this.text;
            },
            endLine: function () {
                if ([null, 'p', 'br', 'hr', 'small', 'span'].includes(this.tagName)) {
                    return '';
                }

                if (!this.text) {
                    return '';
                }
                let line = `</${this.tagName}>\n`;

                if (this.afterElement) {
                    line += this.afterElement + "\n";
                }

                return line;
            }
        },
    }

    /***
    * init constructor
    *
    * @param {Object} source
    * @param {string} tab_space
    * @param {undefined|string} variableName
    */
    constructor(source, tab_spaces, variableName) {
        this.source = this.mergedAttributes(source);
        this.tab_spaces = tab_spaces;
        this.variableName = variableName;
        this.#initialization();
    }

    /**
     * merge attributes
     * 
     * @param array source 
     */
    mergedAttributes(source) {
        const { optional_attributes, ...rest } = source;
        return {
            ...rest,
            attributes: [...[
                ...source.attributes,
                ...[...optional_attributes.filter(attr => {
                    return attr.required
                })],
            ]],
        };
    }

    /**
     * array to string representation for html attributes line
     * 
     * @param {array} attributes 
     * @returns 
     */
    attributesToString(attributes = []) {

        if (attributes.length === 0) {
            return "";
        }
        const line = [...attributes.map(item => {
            return ` ${item.name}="${item.value}"`;
        })].join('');

        return ` ${line}`;
    }

    /**
     * merge block attributes
     */
    #initialization() {
        this.#block = {
            ...this.#block,
            parentElement: {
                ...this.#block.parentElement,
                variableName: this.variableName,
                tab_spaces: this.tab_spaces,
            },
            labelElement: {
                ...this.#block.labelElement,
                variableName: this.variableName,
                tab_spaces: this.tab_spaces,
            },
            formTagElement: {
                ...this.#block.formTagElement,
                variableName: this.variableName,
                tab_spaces: this.tab_spaces,
            },
            errorElement: {
                ...this.#block.errorElement,
                variableName: this.variableName,
                tab_spaces: this.tab_spaces,
            },
            hintElement: {
                ...this.#block.hintElement,
                variableName: this.variableName,
                tab_spaces: this.tab_spaces,
            }
        }
    }

    /**
     * set parent element data
     * 
     * @param string tagName 
     * @param string attr_line 
     */
    setParentElement(objElement) {

        this.#block = {
            ...this.#block,
            parentElement: {
                ...this.#block.parentElement,
                ...objElement,
            }
        }
    }

    /**
     * set label element data
     * 
     * @param string tagName 
     * @param string attr_line
     * @return this
     */
    setLabelElement(objElement) {

        this.#block = {
            ...this.#block,
            labelElement: {
                ...this.#block.labelElement,
                ...objElement,
            }
        }
    }

    /**
     * set form tag element data
     * 
     * @param string tagName 
     * @param string attr_line
     * @param boolean self_closing
     * @return this
     */
    setFormTagElement(objElement) {

        this.#block = {
            ...this.#block,
            formTagElement: {
                ...this.#block.formTagElement,
                ...objElement,
            }
        }

    }

    /**
     * set hint element data
     * 
     * @param string tagName 
     * @param string attr_line
     * @return this
     */
    setHintElement(objElement) {

        this.#block = {
            ...this.#block,
            hintElement: {
                ...this.#block.hintElement,
                ...objElement,
            }
        }
    }

    /**
     * set error element data
     * 
     * @param string tagName 
     * @param string attr_line
     * @return this
     */
    setErrorElement(objElement) {

        this.#block = {
            ...this.#block,
            errorElement: {
                ...this.#block.errorElement,
                ...objElement,
            }
        }
    }

    /**
     * render block
     * @return string
     */
    blockContent() {
        let html = "";
        // parent element join
        html += this.#block.parentElement.startLine();
        // // label element join
        html += this.#block.labelElement.startLine();
        html += this.#block.labelElement.childrenLine();
        html += this.#block.labelElement.endLine();
        // // form tag element join
        html += this.#block.formTagElement.startLine();
        html += this.#block.formTagElement.childrenLine();
        html += this.#block.formTagElement.endLine();
        // error element join
        html += this.#block.errorElement.startLine();
        html += this.#block.errorElement.childrenLine();
        html += this.#block.errorElement.endLine();
        // // hint element join
        html += this.#block.hintElement.startLine();
        html += this.#block.hintElement.childrenLine();
        html += this.#block.hintElement.endLine();

        // // parent element join
        html += this.#block.parentElement.endLine();

        return html;
    }


    render() {

        return new Promise((resolve) => {

            // Perform the merging logic here
            const { _run_addon } = window;
            const { source, tab_spaces, variableName } = this;

            this.setParentElement(
                _run_addon.parent(source, tab_spaces, variableName)
            );

            this.setLabelElement(
                _run_addon.label(source, tab_spaces, variableName)
            );

            this.setFormTagElement(
                _run_addon.main(source, tab_spaces, variableName)
            );

            this.setErrorElement(
                _run_addon.error(source, tab_spaces, variableName)
            );
            
            this.setHintElement(
                _run_addon.hint(source, tab_spaces, variableName)
            );

            // Simulating an asynchronous operation with a timeout
            setTimeout(() => {
                resolve(this.blockContent());
            }, 500); // Replace this with your actual merging logic
        });
    }
}

const block = (blockItem, tab_spaces, variableName) => new BlockClass(blockItem, tab_spaces, variableName);

export default block;