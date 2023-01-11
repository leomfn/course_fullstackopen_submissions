const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Content = ({ parts }) =>
    <>
        {parts.map(
            (part) => <Part key={part.id} part={part} />
        )}
    </>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Course = ({ course }) => {
    const { name, parts } = course
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={parts.reduce((sum, part) => sum + part.exercises, 0)} />
        </>
    )
}

export default Course