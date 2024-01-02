
export const toAttributes = (requiredAttributes, optionalAttributes) => {
    // Promise
}

export const mergeAttrsPromise = async (attributes, optionalAttributes) => {
    return new Promise((resolve) => {
        // Simulating an asynchronous merge with a timeout
        setTimeout(() => {
            let mergedAttributes = [
                ...attributes,
                ...[...optionalAttributes.filter(attr => {
                    return attr.required
                })],
            ].map(attr => {
                return {
                    ...attr,
                    className: attr.className || '',
                }
            });

            resolve(mergedAttributes);
        }, 2000); // Replace this with your actual merging logic
    });
};
