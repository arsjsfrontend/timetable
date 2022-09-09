interface LayoutProps {
	children: React.ReactNode
}

const TimetableWrapper = (props: LayoutProps) => {
	return (
		<div className="timetable-wrapper">
			{props.children}
		</div>
	)
}

export default TimetableWrapper;