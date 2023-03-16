import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react-native'

import userEvent from '@testing-library/user-event'
import { TextInput } from 'react-native'

const Com = ()=>{
  return(<>
    <label htmlFor="time">Enter a time</label>
    <TextInput placeholder='Enter a time'/>
  </>)
}
test('types into the input', async() => {
  render(
    <Com/>
  )
  fireEvent.changeText(screen.getByPlaceholderText('Enter a time'), 'korrawee')
  const usernameOutput = await screen.findByPlaceholderText('Enter a time')

console.log(usernameOutput.value);
  // expect(input).('13:58')
})