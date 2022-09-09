import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getClasses, getRooms, getSubjects, getTeachers } from '../Api';
import { SubjectFromTeacher } from '../helpers/default';


export interface TimetableInterface {
	teachers: object[];
	classes: object[];
	rooms: object[];
	subjects: SubjectFromTeacher[];
	timetable: object[];
	status: 'idle' | 'loading' | 'failed';
};

const initialState: TimetableInterface = {
	teachers: [],
	classes: [],
	rooms: [],
	subjects: [],
	timetable: [],
	status: 'idle'
};


const timetableSlice = createSlice({
	name: 'classes',
	initialState,
	reducers: {
		addClasses: (state, action: PayloadAction<object[]>) => {
			state.classes = action.payload;
		},
		addSubjects: (state, action: PayloadAction<SubjectFromTeacher[]>) => {
			state.subjects = action.payload;
		},
		addTeachers: (state, action: PayloadAction<object[]>) => {
			state.teachers = action.payload;
		},
		addRooms: (state, action: PayloadAction<object[]>) => {
			state.rooms = action.payload;
		},
		addTimetable: (state, action: PayloadAction<object[]>) => {
			state.timetable = action.payload;
		}
	}
});

export const {
	addClasses,
	addSubjects,
	addRooms,
	addTeachers,
	addTimetable,
} = timetableSlice.actions;

export const classesState = (state: RootState) => state.timetable.classes;
export const roomsState = (state: RootState) => state.timetable.rooms;
export const teachersState = (state: RootState) => state.timetable.teachers;
export const subjectsState = (state: RootState) => state.timetable.subjects;
export const timetableState = (state: RootState) => state.timetable.timetable;


export const setClasses = createAsyncThunk(
	'classes/setClasses',
	async (_: | void, thunkAPI) => {
		getClasses()
			.then((res: any) => thunkAPI.dispatch(addClasses(res.data)))
			.catch(err => console.log(err))
	}
)

export const setSubjcets = createAsyncThunk(
	'subjects/setSubjects',
	async (_: | void, thunkAPI) => {
		getSubjects()
			.then((res: any) => thunkAPI.dispatch(addSubjects(res.data)))
			.catch(err => console.log(err))
	}
)

export const setRooms = createAsyncThunk(
	'rooms/setRooms',
	async (_: | void, thunkAPI) => {
		getRooms()
			.then((res: any) => thunkAPI.dispatch(addRooms(res.data)))
			.catch(err => console.log(err))
	}
)

export const setTeachers = createAsyncThunk(
	'teachers/setTeachers',
	async (array: SubjectFromTeacher[], thunkAPI) => {
		getTeachers(array)
			.then((res: any) => thunkAPI.dispatch(addTeachers(res.data)))
			.catch(err => console.log(err))
	}
)


export default timetableSlice.reducer;