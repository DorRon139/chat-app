import { createSlice } from "@reduxjs/toolkit";

interface Ilang {
  lang: "en" | "he";
}
const initialState: Ilang = {
  lang: "en",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = generalSlice.actions;
export default generalSlice.reducer;
