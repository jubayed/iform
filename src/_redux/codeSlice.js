import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    idle: '',
    tab_spaces: Array.from({ length: 3 }).map(() => '\u00A0').join(''),
    platform: 'bootstrap', // wordpress, laravel, nodejs, react
    platforms: ['bootstrap'], // wordpress, laravel, nodejs, react
    page_type: 'create_page', // create_page, edit_page
    variable_name: '$data->', // variable name or prefix for show 
}

export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setPlatforms: (state, action) => {
            return {
                ...state,
                platforms: Array.from(
                    new Set([...action.payload, ...state.platforms])
                ),
            }
        },
        onChangeCode: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        },
        resetCodeOutput: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { resetCodeOutput, setPlatforms, onChangeCode } = codeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.banner.value)`
export const codeSelector = (state) => state.code;

export default codeSlice.reducer