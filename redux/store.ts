import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timetable from './timetable';


export const store = configureStore({
	reducer: {
		timetable: timetable
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
