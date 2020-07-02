import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
}
  
const Total = ({course}) => {

  let total = 0
  course.parts.forEach(element => {
    total = total + element.exercises
  });
  
  return (
    <div>
      <p>Total number of exercises {total}</p>
    </div>
  )
}
  
const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}
  
const Course = ({course}) => {  
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total course={course} />
        </div>
    )
}

export default Course