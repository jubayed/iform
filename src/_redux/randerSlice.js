import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    init: false,
    idle: '',
    data: [],
}

export const randerSlice = createSlice({
    name: 'rander',
    initialState,
    reducers: {
        initRander: (state, action) => {
            return {
                ...state,
                init: true,
                data: action.payload
            };
        },
        onChangeItem: (state, action) => {
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if(index !== action.payload.index) {
                        return item;
                    }
                    return {
                        ...item,
                        [action.payload.type]: action.payload.item
                    }
                }),
            };
        },
        resetRander: () => {
            return initialState;;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    initRander, resetRander, onChangeItem,
} = randerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.banner.value)`
export const randerSelector = (state) => state.rander;

export default randerSlice.reducer