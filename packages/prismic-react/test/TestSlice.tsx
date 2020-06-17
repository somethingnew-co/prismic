import React from 'react'

function TestSlice({ primary }: { primary: any }): JSX.Element {
  return (
    <div>
      <h1>{primary.title}</h1>
    </div>
  )
}

export default TestSlice
