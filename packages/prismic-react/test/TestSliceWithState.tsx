import React, { useState, useEffect } from 'react'

function TestSliceWithState({ primary }: { primary: any }): JSX.Element {
  const [state, setState] = useState('state not set')

  useEffect(() => {
    setState('state set')
  }, [])
  return (
    <div>
      <h1>{primary.title}</h1>
      <h2>{state}</h2>
    </div>
  )
}

export class NamedTestSliceWithState extends React.Component {
  title: string
  state: {
    text: string;
  }

  constructor(props: { primary: any }) {
    super(props)

    this.title = props.primary.title
    this.state = {
      text: 'I have state',
    }
  }

  componentDidMount(): void {
    this.setState({
      text: 'I am set',
    })
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>{this.title}</h1>
        <h1>{this.state.text}</h1>
      </div>
    )
  }
}

export default TestSliceWithState
