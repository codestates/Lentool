import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type detailPostState = {
  detailPost: any
}

export const detailPostSlice = createSlice({ 
  name: 'detailPost',
  initialState: { detailPost: null } as detailPostState,
  reducers: {
    getDetailPost: (
      state, 
      action : PayloadAction<any>
    ) => {
      state.detailPost = action.payload
      // console.log('받은데이터',action.payload)
    }
  },

})

export const { getDetailPost } = detailPostSlice.actions;
export default detailPostSlice.reducer;

