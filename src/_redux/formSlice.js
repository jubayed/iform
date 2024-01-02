import { createSlice } from '@reduxjs/toolkit'
import update from 'immutability-helper'
import { boxTypes } from '../_data/box-type'

const initialState = {
    init: true,
    idle: '',
    layoutWith: 992,
    data: [],
    LAST_USED_INDEX: null,
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setLastUseIndex: (state, action) => {
            return {
                ...state,
                LAST_USED_INDEX: action.payload,
            }
        },
        setLayoutWith: (state, action) => {
            return {
                ...state,
                layoutWith: action.payload,
            }
        },
        addField: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            return {
                ...state,
                LAST_USED_INDEX: action.payload.index === undefined ? 0 : 1 + action.payload.index,
                data: update(state.data, {
                    $splice: [[
                        action.payload.index + 1, 0,
                        action.payload.item
                    ]],
                    $apply: arr => [...arr.map((obj, i) => ({ ...obj, index: i }))]
                }),
            }
        },
        removeField: (state, action) => {
            return {
                ...state,
                data: [
                    ...state.data.filter((f, k) => k !== action.payload)
                ],
            }
        },
        moveField: (state, action) => {
            return {
                ...state,
                data: update(state.data, {
                    $splice: [
                        [action.payload.dragIndex, 1],
                        [action.payload.hoverIndex, 0, state.data[action.payload.dragIndex]],
                    ],
                }),
            }
        },
        updateField: (state, action) => {
            return {
                ...state,
                data: state.data.map((item, k) => {
                    return k === action.payload.index ? action.payload.item : item;
                }),
            }
        },
        // parent class layout class
        updateParentClass: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return {
                ...state,
                data: state.data.map((item, key) => {
                    return item;
                }),
            }
        },

        // work start here
        fieldTypeChange: (state, action) => {

            let preDefineItem = boxTypes.find(boxType => {
                const { attributes } = boxType;

                return undefined !== attributes.find(attr => {
                    return attr.name === 'type' && attr.value === action.payload.type;
                });
            });

            if (preDefineItem === undefined) {
                preDefineItem = boxTypes.find(boxType => {
                    return boxType.tagName === action.payload.tagName;
                });
            }

            if (preDefineItem === undefined) {
                return state;
            }

            return {
                ...state,
                data: [
                    ...state.data.map((item, key) => {
                        if (key !== action.payload.index) {
                            return item;
                        }

                        //fixed item object keys
                        const pItem = [...Object.keys(preDefineItem)].reduce((result, key) => {

                            if (item.hasOwnProperty(key)) {
                                result[key] = item[key];
                            } else {
                                result[key] = preDefineItem[key];
                            }
                            return result;
                        }, {});

                        const attributes = [...preDefineItem.attributes].map(attr => {

                            const itemAttr = item.attributes.find(iAttr => iAttr.name === attr.name);

                            if (attr.name === 'type') {
                                return {
                                    ...attr,
                                    value: action.payload.type
                                }
                            }
                            else if (itemAttr) {
                                return itemAttr;
                            }

                            return attr;
                        });

                        const optional_attributes = [...preDefineItem.optional_attributes].map(attr => {

                            const itemAttr = item.optional_attributes.find(iAttr => iAttr.name === attr.name);
                            return itemAttr? itemAttr: attr;
                        });

                        return {
                            ...pItem,
                            attributes: attributes,
                            optional_attributes: optional_attributes
                        };
                    }),
                ],
            };
        },
        fieldPropertyChange: (state, action) => {
            return {
                ...state,
                data: [...state.data.map((item, index) => {
                    if (action.payload.index !== index) {
                        return item;
                    }
                    return {
                        ...item,
                        [action.payload.name]: action.payload.value,
                    };
                })]
            }
        },
        fieldPropertyAttrChange: (state, action) => {
            return {
                ...state,
                data: [...state.data.map((item, index) => {
                    if (action.payload.index !== index) {
                        return item;
                    }
                    return {
                        ...item,
                        attributes: {
                            ...item.attributes,
                            [action.payload.name]: action.payload.value,
                        }
                    };
                })]
            }
        },

        //attributes change
        onChangeAttr: (state, action) => {
            return {
                ...state,
                data: [...state.data.map((item, index) => {
                    if (action.payload.index !== index) {
                        return item;
                    }
                    return {
                        ...item,
                        attributes: [...item.attributes.map((attr, key) => {
                            if (key !== action.payload.attrKey) {
                                return attr;
                            }
                            return {
                                ...attr,
                                [action.payload.name]: action.payload.value,
                            }
                        })]
                    };
                })]
            }
        },

        // optional attributes change requred 
        onChangeOptAttr: (state, action) => {
            return {
                ...state,
                data: [...state.data.map((item, index) => {
                    if (action.payload.index !== index) {
                        return item;
                    }
                    return {
                        ...item,
                        optional_attributes: [...item.optional_attributes.map((attr, key) => {
                            if (key !== action.payload.attrKey) {
                                return attr;
                            }
                            return {
                                ...attr,
                                [action.payload.name]: action.payload.value,
                            }
                        })]
                    };
                })]
            }
        },

        setEmptyData: (state) => {
            return {
                ...state,
                data: [],
            }
        },

        setData: (state, action) => {
            return {
                ...state,
                data: action.payload,
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setLastUseIndex,
    addField,
    removeField,
    moveField,
    setLayoutWith,
    updateParentClass,
    updateField,
    fieldTypeChange,
    fieldPropertyChange,
    fieldPropertyAttrChange,
    onChangeOptAttr,
    onChangeAttr,
    setEmptyData,
    setData,
} = formSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.banner.value)`
export const formSelector = (state) => state.form;

export default formSlice.reducer