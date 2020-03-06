import React from 'react'
import { Link } from 'react-router-dom'
import { format, parse } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const note_id = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return Promise.reject('Could not delete')
      })
      .then(() => {
        this.context.deleteNote(note_id)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(note_id)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { title, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {title}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {moment(modified).format('Do MMM YYYY')}
            </span>
          </div>
        </div>
        <div className='Note__Content'>
        </div>
      </div>
    )
  }
}
Note.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number
}