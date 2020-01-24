import React from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

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
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
       {note.content}
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.PropTypes = {
  match: PropTypes.object,
  params: PropTypes.object
}