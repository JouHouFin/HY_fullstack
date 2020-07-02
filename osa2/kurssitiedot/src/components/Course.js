import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </>
    )
}
  
const Total = ({parts}) => {

  const total = parts.reduce((total, part) => total + part.exercises, 0)
  
  return (
    <tr>
      <td>Total number of exercises</td><td>{total}</td>
    </tr>
  )
}
  
const Part = ({name, exercises}) => {
    return (
      <tr>
        <td>{name}</td>
        <td>{exercises}</td>
      </tr>
    )
}
  
const Course = ({course}) => {  
    return (
        <div>
          <Header course={course} />
          <table>
            <tbody>
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </tbody>
          </table>
        </div>
    )
}

export default Course