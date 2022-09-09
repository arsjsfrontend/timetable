import { v4 as uuidv4 } from 'uuid';

export interface SubjectFromTeacher {
	name: string,
	id: number
}

interface TeacherInterface {
	name: string,
	id: number,
	subject: object[]
}

export const getRandomNum = (max: number, min: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const sortClassesForLevel = (a: any, b: any) => {
	return a.level - b.level;
};

export const createClasses = (letterClasses: string[]) => {
	const classes = letterClasses.map(elem => {
		const group = Array.from(
			{ length: 7 },
			(_, index) => {
				return { level: index + 5, letter: elem }
			}
		);
		return group
	})
	const newClasses: object[] = [];

	return newClasses.concat(classes[0], classes[1], classes[2]).sort(sortClassesForLevel)
};


export const randomSubjcetIDFromTeacher = (subjects: SubjectFromTeacher[]) => {
	const newSubjects: number[] = [];

	const numSubject = getRandomNum(10, 7);
	for (let i = 0; i <= numSubject; i++) {
		const randSubject = Math.floor(Math.random() * subjects.length);

		if (!newSubjects.includes(subjects[randSubject].id)) {
			newSubjects.push(subjects[randSubject].id);
		}
	}
	return newSubjects;
};

export const randomSubjcetFromTeacher = (subjects: SubjectFromTeacher[]) => {
	const newSubjects: any = [];

	const numSubject = getRandomNum(8, 5);
	for (let i = 0; i < numSubject; i++) {
		const randSubject = Math.floor(Math.random() * subjects.length);

		newSubjects.push(subjects[randSubject]);

	}
	return newSubjects;
};

export const checkingMultipleLessons = (validatingArray: any, timetable: any, field: string, initialDraggable: any, finalDraggable: any) => {
	const copyTimetable = [...timetable];

	const fromTo = [initialDraggable.index, finalDraggable.index].sort((a, b) => a - b);

	const dayArray = initialDraggable.droppableId === finalDraggable.droppableId ?
		[initialDraggable.droppableId] :
		[initialDraggable.droppableId, finalDraggable.droppableId];

	const maxLessons = [0, 1, 2, 3, 4, 5, 6];
	const numLessons = dayArray.length > 1 ? fromTo : maxLessons.splice(fromTo[0], fromTo[1] + 1);

	for (let dayIndex = 0; dayIndex < dayArray.length; dayIndex++) {
		for (let lessonIndex = 0; lessonIndex < numLessons.length; lessonIndex++) {
			validatingArray.forEach((validatingElem: any) => {
				let filterArr: any = [];

				timetable.forEach((item: any) => {
					const subject = item[dayArray[dayIndex]][numLessons[lessonIndex]];

					if (subject && !subject.id) {
						subject.forEach((subgroup: any) => {
							if (validatingElem.id === subgroup[field]) {
								filterArr.push(validatingElem.id)
							}
						})
					}

					if (subject && (validatingElem.id === subject[field])) {
						filterArr.push(validatingElem.id)
					}

				});

				if (filterArr.length > 1) {
					copyTimetable.forEach((item: any, index: any) => {

						const copyClass = { ...item };
						const day: any = [...copyClass[dayArray[dayIndex]]];
						const lesson: any = Array.isArray(day[numLessons[lessonIndex]]) ?
							[...day[numLessons[lessonIndex]]]
							: { ...day[numLessons[lessonIndex]] };

						if (lesson && Array.isArray(lesson)) {
							const newLesson = lesson.map((subgroup: any) => {
								if (lesson && (filterArr[0] === subgroup[field])) {
									return { ...subgroup, isError: true }
								}
								return subgroup;
							})
							day.splice(numLessons[lessonIndex], 1, newLesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}

						if (lesson && (filterArr[0] === lesson[field])) {
							lesson.isError = true;

							day.splice(numLessons[lessonIndex], 1, lesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}
					})
				}

				if (filterArr.length === 1) {
					copyTimetable.forEach((item: any, index: any) => {

						const copyClass = { ...item };
						const day: any = [...copyClass[dayArray[dayIndex]]];
						const lesson: any = Array.isArray(day[numLessons[lessonIndex]]) ?
							[...day[numLessons[lessonIndex]]]
							: { ...day[numLessons[lessonIndex]] };

						if (lesson && Array.isArray(lesson)) {
							const newLesson = lesson.map((subgroup: any) => {
								if (lesson && (filterArr[0] === subgroup[field])) {
									return { ...subgroup, isError: false }
								}
								return subgroup;
							})
							day.splice(numLessons[lessonIndex], 1, newLesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}

						if (lesson && (filterArr[0] === lesson[field])) {
							lesson.isError = false;

							day.splice(numLessons[lessonIndex], 1, lesson);
							copyClass[dayArray[dayIndex]] = day;
							copyTimetable.splice(index, 1, copyClass);
						}
					})

				}


			})
		}

	}

	return copyTimetable;
};

const checkTimetable = (validatingArray: any, timetable: any, field: string) => {
	const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const numLessons = [0, 1, 2, 3, 4, 5, 6];

	for (let dayIndex = 0; dayIndex < dayArray.length; dayIndex++) {
		for (let lessonIndex = 0; lessonIndex < numLessons.length; lessonIndex++) {
			validatingArray.forEach((validatingElem: any) => {
				let filterArr: any = [];

				timetable.forEach((item: any) => {
					const subject = item[dayArray[dayIndex]][lessonIndex];

					if (subject && !subject.id) {
						subject.forEach((subgroup: any) => {
							if (validatingElem.id === subgroup[field]) {
								filterArr.push(validatingElem.id)
							}
						})
					}

					if (subject && (validatingElem.id === subject[field])) {
						filterArr.push(validatingElem.id)
					}

				});
				if (filterArr.length > 1) {
					timetable.forEach((item: any) => {
						const subject = item[dayArray[dayIndex]][lessonIndex];

						if (subject && !subject.id) {
							subject.forEach((subgroup: any) => {
								if (filterArr[0] === subgroup[field]) {
									subgroup.isError = true;
								}
							})
						}

						if (subject && (filterArr[0] === subject[field])) {
							subject.isError = true;
						}
					})
				}

			})
		}

	}

};

const randomSubjects = (allSubjects: any, allTeachers: any) => {
	const subjects = randomSubjcetFromTeacher(allSubjects);

	if (subjects.length < 7) {
		for (let lacks = 0; lacks <= (7 - subjects.length); lacks++) {
			subjects.push(null)
		}
	}

	const newSubjects = subjects.map((subj: any) => {
		if (subj) {
			const localTeacher: any = [];
			allTeachers.forEach((teach: any) => {
				const isTeach = teach.subject.find((item: any) => item === subj.id);
				if (isTeach) {
					localTeacher.push(teach);
				}
			})
			const teacher: TeacherInterface = localTeacher[getRandomNum(localTeacher.length, 0)];
			if (teacher) {

				if (subj.name === 'Информатика' || subj.name === "Англ. язык") {
					return [
						{ id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(15, 1), teacher: localTeacher[getRandomNum(localTeacher.length / 2, 0)].id },
						{ id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(30, 16), teacher: localTeacher[getRandomNum(localTeacher.length, localTeacher.length / 2)].id },

					]
				}

				return { id: uuidv4(), subject: subj.name, subjectID: subj.id, isError: false, room: getRandomNum(30, 1), teacher: teacher.id }
			}
		}
		return null


	})
	return newSubjects;
};

export const creatingSchedule = (classes: any, subjects: any, teachers: any, rooms: any) => {
	const timetable = classes.map((obj: any) => {
		return {
			class: obj,
			Monday: randomSubjects(subjects, teachers),
			Tuesday: randomSubjects(subjects, teachers),
			Wednesday: randomSubjects(subjects, teachers),
			Thursday: randomSubjects(subjects, teachers),
			Friday: randomSubjects(subjects, teachers)
		}
	});

	checkTimetable(teachers, timetable, 'teacher');
	checkTimetable(rooms, timetable, 'room');

	return timetable;

};

export const removeDraggable = (list: any, startIndex: any, endIndex: any) => {
	const copyList: any = { ...list };
	const copyDay = [...copyList[startIndex.droppableId]];
	copyDay.splice(startIndex.index, 1, null);
	copyList[startIndex.droppableId] = copyDay;

	return copyList;
};

export const reorder = (list: any, startIndex: any, endIndex: any) => {

	if (startIndex.droppableId === endIndex.droppableId) {
		const copyList: any = { ...list };
		const copyDay = [...copyList[startIndex.droppableId]];
		const [removed] = copyDay.splice(startIndex.index, 1);
		copyDay.splice(endIndex.index, 0, removed);
		copyList[startIndex.droppableId] = copyDay;

		return copyList;
	} else {
		const copyList: any = { ...list }
		const copyStartDay = [...copyList[startIndex.droppableId]];
		const copyEndDay = [...copyList[endIndex.droppableId]];

		const [removed] = [...copyList[startIndex.droppableId]].splice(startIndex.index, 1);
		const [replaced] = [...copyList[endIndex.droppableId]].splice(endIndex.index, 1);


		copyStartDay.splice(startIndex.index, 1, replaced)
		copyEndDay.splice(endIndex.index, 1, removed)

		if (copyEndDay.length > 7) {
			console.log("больше 7")
			return copyList;
		}

		copyList[startIndex.droppableId] = copyStartDay;
		copyList[endIndex.droppableId] = copyEndDay;

		return copyList;
	}

};
