import React from 'react'

function TestSlice({ primary }: { primary: any }): JSX.Element {
  return (
    <div>
      <h1>{primary.title}</h1>
    </div>
  )
}

export class NamedTestSlice extends React.Component {
  title: string

  constructor(props: { primary: any }) {
    super(props)

    this.title = props.primary.title
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>{this.title}</h1>
      </div>
    )
  }
}

export default TestSlice
