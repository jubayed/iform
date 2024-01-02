
/**
 * Global app initialization
 * 
 * @param {*} date 
 * @returns 
 */
export const app = {

    /**
     * box attributes to string
     * 
     * @param {array} attributes 
     * @return {string}
     */
    attributeToString: (attributes = []) => {

        if (attributes.length === 0) {
            return '';
        }

        return ' ' + attributes.map(item => {
            return ` ${item.name}="${item.value}"`;
        }).join('');
    },

    /**
     * check tag is self closing
     * 
     * @param {string} tag 
     * @param {boolean} force 
     * @return {boolean}
     */
    isSelfClose: (tag = "div", force = false) => {
        const selfClosingTags = [
            "area", "base", "br", "col", "command", "embed", "hr", "img",
            "input", "keygen", "link", "meta", "param", "source", "track", "wbr"
        ];

        return selfClosingTags.includes(tag.toLowerCase()) && force === false;
    },

    /**
     * 
     * @param {array} attributes 
     * @param {string|array} names
     * @param {*} defaultValue 
     * @returns {*}
     */
    getAttributesValue: (attributes, names, defaultValue = undefined) => {

        if (typeof names === "string") {

            const attr = attributes.find(item => {
                return item.name === names;
            });

            return attr ? attr.value : defaultValue;
        }
        else if (Array.isArray(names)) {

            return [...names.map(name => {
                const attr = attributes.find(item => {
                    return item.name === name;
                });

                return attr ? attr.value : defaultValue;
            })];
        }
        else if (names && typeof names === 'object' && names && Object.values(names).length) {
            const result = {};

            for (const name of Object.values(names)) {
                const attr = attributes.find((item) => item.name === name);
                result[name] = attr ? attr.value : defaultValue;
            }

            return result;
        }

        return defaultValue;
    },

    ariaDescribedby: (source) => {
        
        let name = '';
        let fieldName = source.attributes.find(attr => attr.name === 'name');

        if(fieldName){
            name = fieldName.value;
        }

        if(source.hint && source.hint !== ''){
            return [{name: 'aria-describedby', value: `${name}Help`}]
        }

        return [];
    }
}

/**
 * Global app initialization
 */
if (window.app === undefined) {
    window.app = app;
}
