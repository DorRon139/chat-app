import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import userSliceReducers from './user/user.slice'
import generalSliceReducer from './general/generalSlice'

const logger = createLogger()

const store = configureStore({
    reducer: {
        user: userSliceReducers,
        general: generalSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export default store