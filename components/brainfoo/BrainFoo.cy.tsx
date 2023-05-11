import React from 'react'
import BrainFoo from './BrainFoo'

describe('<BrainFoo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrainFoo />)
  })
})