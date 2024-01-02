
export const IS_DEMO_VERSION = false;
/**
 * Get parentClass to class string
 * 
 * @param {Object|undefined} parentClass 
 * @returns 
 */
export const __cString = (parentClass) => {
    if (!parentClass) {
        return 'col-sm-12';
    }
    let className = [
        ...[...Object.keys(parentClass)
            .filter(key => parentClass[key] !== '')]
            .map(key => `col-${key}-${parentClass[key]}`)
    ].join(' ');

    if (className === '' || className === ' ') {
        className = 'col-sm-12';
    }
    return className;
}

/**
 * Get current class name for fieldsets
 * 
 * @param {Object|undefined} parentClass 
 * @param {Number} width 
 * @return { String}
 */
export const __currentClass = (parentClass, width = 576) => {
    if (!parentClass) {
        return 'col-sm-12';
    }

    const breakpoints = {
        1400: 'xxl',
        1200: 'xl',
        992: 'lg',
        768: 'md',
        576: 'sm',
        575: 'xs',
    }

    // fixed or bootstrap xs breakpoint css behavior
    let exactCol = parentClass[breakpoints[width]];
    if (!['', ' '].includes(exactCol)) {
        return `col-sm-${exactCol}`;
    }

    const targetWidth = Object.keys(breakpoints).slice(1).filter(w => w <= width).map(w => parseInt(w)).sort((a, b) => b - a).find(w => {
        return breakpoints[w] && !['', ' '].includes(parentClass[breakpoints[w]]);
    });

    // breakpoints[targetWidth] ensure to remove unspecified breakpoint
    if (targetWidth && breakpoints[targetWidth]) {
        return `col-sm-${parentClass[breakpoints[targetWidth]]}`;
    }

    return `col-sm-12`;
}

/**
 * Mearge Attributes and Optinal attributes 
 * 
 * @param {Array} requiredAttr 
 * @param {Array} optionalAttr 
 * @returns 
 */
export const attributesMerge = (requiredAttr, optionalAttr) => {
    return [...requiredAttr, ...optionalAttr]
}

export const getAttrs = (requiredAttr, optionalAttr) => {
    // const attributes = [...requiredAttr, ...optionalAttr];

}

/**
 * Get current lang name
 * 
 * @returns 
 */
export const getLang = function () {
    var storageLang = window.localStorage.getItem('APP_LANG');

    const domLang = navigator.language.substr(0, 2);
    const currentLang = storageLang ? storageLang : domLang;
    window.localStorage.setItem('APP_LANG', currentLang);

    return currentLang;
}