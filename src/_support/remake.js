import { mergeAttrsPromise } from "./attributes";
import BlockClass, { block } from "./block";

/**
 * Source is number of fields array
 * @param {*} source 
 */
export const __mergeAttributes = async (source) => {

    // merge attributes and optianl attributes
    let fields = await Promise.all(
        source.map(async (field, key) => {
            const { optional_attributes, ...rest } = field;
            return {
                ...rest,
                attributes: await mergeAttrsPromise(field.attributes, optional_attributes),
            };
        })
    );

    return fields;
}


const __remake = (source, $class) => BlockClass(source, $class)

export const bootFn = () => {
    let type = null;
    let tagName = null;

    const init = () => {

    }
}

export default __remake;