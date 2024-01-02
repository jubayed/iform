import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    APP_INIT: false, // true, false, null
    TOUCH_MODE: false, // touch and drag only
    FIELD_EDIT_INDEX: null,
    APP_CONTAINER: "container-off", //container, container-fluid, container-off
    APP_LANG: 'en',
    HTML_DIR: 'ltr', //ltr,rtl
    languages: ['en'],
    CODE_HIGHLIGHT: 'highlighter', //highlighter, no
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSetting: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        },
        onChangeTab: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSetting, onChangeTab } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.banner.value)`
export const settingsSelector = (state) => state.settings;

export default settingsSlice.reducer