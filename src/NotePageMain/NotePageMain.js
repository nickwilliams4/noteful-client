import React from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || {}
    console.log(note_id)
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        <div className='Note_title'>{note.title}</div>
       <div className='Note_content'>{note.content}</div>
       <div className='NoteDatesModified'>
            Modified:
            {' '}
            <span className='Date_modified'>
              {moment(note.modified).format('Do MMM YYYY')}
            </span>
          </div>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object
}