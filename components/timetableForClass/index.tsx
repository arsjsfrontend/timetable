import OneDayCard from "../cards";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorder, removeDraggable, checkingMultipleLessons } from '../../helpers/default';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTimetable, roomsState, teachersState, timetableState } from "../../redux/timetable";

interface GroupInterface {
	class: {
		level: number,
		letter: string
	},
	letter: string
	Monday: object[],
	Tuesday: object[],
	Wednesday: object[],
	Thursday: object[],
	Friday: object[]
}

interface PropsInterface {
	group: GroupInterface
}


const TimetableForClass = ({ group }: PropsInterface) => {
	const timetable = useAppSelector(timetableState);
	const teachers = useAppSelector(teachersState);
	const rooms = useAppSelector(roomsState);
	const dispatch = useAppDispatch();

	const refreshTimetable = (timetable: any, classObject: any, start: any, end: any) => {
		const copyTimetable: any = [...timetable];
		const changedClassIndex = copyTimetable.findIndex((group: any) =>
			group.class.level === classObject.class.level && group.class.letter === classObject.class.letter
		)
		copyTimetable.splice(changedClassIndex, 1, classObject)

		const checkingForTeacher = checkingMultipleLessons(teachers, copyTimetable, 'teacher', start, end);
		const checkingForRoom = checkingMultipleLessons(rooms, checkingForTeacher, 'room', start, end);

		dispatch(addTimetable(checkingForRoom));
	};


	const onDragEnd = (result: any) => {
		const { destination, source } = result;

		if (!destination) {
			const quotes = removeDraggable(
				group,
				result.source,
				result.destination
			);

			refreshTimetable(
				timetable,
				quotes,
				result.source,
				result.source
			);
			return
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const quotes = reorder(
			group,
			result.source,
			result.destination
		);

		refreshTimetable(
			timetable,
			quotes,
			result.source,
			result.destination
		);
	};

	const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	if (!group) {
		return <p>loading...</p>
	}

	return (
		<DragDropContext onDragEnd={onDragEnd} onDragStart={() => { }}>
			<div className="class-column">
				<div className="class-number">
					{group.class.level} - {group.class.letter}
				</div>
				{dayOfWeek.map((day, dayIndex) => {
					return (
						<Droppable droppableId={day} key={dayIndex}>
							{(provider, snapshot) => (
								<div
									ref={provider.innerRef}
									{...provider.droppableProps}
								>
									<OneDayCard group={group} day={day} />
									{provider.placeholder}
								</div>
							)}

						</Droppable>

					)
				})}
			</div>
		</DragDropContext>

	)
}

export default TimetableForClass;