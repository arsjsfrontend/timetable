import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const LessonList = React.memo(function QuoteList({ timetableDay }: any) {

	return timetableDay.map((less: any, lessIndex: number) => {
		if (!less) {
			const id = uuidv4();
			return (
				<Draggable key={id} draggableId={id} index={lessIndex} isDragDisabled>
					{(provider) => (
						<div className="lesson" ref={provider.innerRef}
							{...provider.draggableProps}
							{...provider.dragHandleProps}>
							<div className="subject-empty">&nbsp;{lessIndex + 1}. ...</div>
							<div className="room-empty">-</div>
						</div>
					)}
				</Draggable>
			)
		}

		if (less && !less.id) {
			return (
				<Draggable key={less[0].id} draggableId={less[0].id} index={lessIndex}>
					{(provider, snapshot) => (

						<div className="lesson" ref={provider.innerRef}
							{...provider.draggableProps}
							{...provider.dragHandleProps}>
							<div
								className={
									`subject-empty 
								${less && ' subject'}
								${less && (less[0].isError || less[1].isError) && ' error'}`}
							>
								&nbsp;{lessIndex + 1}. {less && less[0].subject} | {less && less[0].subject}
							</div>
							<div className={`room-empty ${less && ' room'}`}>
								{less && less[0].room}/{less && less[1].room}
							</div>
						</div>
					)}
				</Draggable>
			)
		}

		return (
			<Draggable key={less.id} draggableId={less.id} index={lessIndex}>
				{(provider, snapshot) => (

					<div className="lesson" ref={provider.innerRef}
						{...provider.draggableProps}
						{...provider.dragHandleProps}>
						<div
							className={
								`subject-empty 
								${less && ' subject'}
								${less && less.isError && ' error'}`}
						>
							&nbsp;{lessIndex + 1}. {less && less.subject}
						</div>
						<div className={`room-empty ${less && ' room'}`}>
							{less && less.room}
						</div>
					</div>
				)}
			</Draggable>
		)

	});
});



const OneDayCard = ({ group, day }: any) => {

	return (
		<div className="card">
			{group && group[day] &&
				<LessonList timetableDay={group[day]} />
			}
		</div>
	)
}

export default OneDayCard;
