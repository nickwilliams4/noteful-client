import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotePageNav from './NotePageNav'

describe(`NotePageNav component`, () => {
  const props = {
    folder: {
      "name": "Important"
    }
  }

  it('renders a .NotePageNav by default', () => {
    const wrapper = shallow(<NotePageNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
