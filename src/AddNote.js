import React, { Component } from  'react'
import './AddNote.css'
import config from './config'
import ApiContext from './ApiContext'
import ErrorBoundary from './ErrorBoundary'
import PropTypes from 'prop-types'

const Required = () => (
  <span className='AddNote__required'>*</span>
)

class AddNote extends Component {
  static contextType = ApiContext;

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    const { title, content, id, folder_id } = e.target
    const notes = {
      title: title.value,
      content: content.value,
      id: id.value
    }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(notes),
      headers: {'Content-Type': 'application/json'}
      
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        data.title = title.value
        data.content = content.value
        data.id = id.value
        data.folder_id = folder_id.value
        data.modified = Date.now()
        this.context.addNote(data)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }
  handleClickCancel = () => {
    this.props.history.push('/')
  };
  render() {
    const { error } = this.state
    return (
      <ErrorBoundary>
      <section className='AddNote'>
        <h2>Create a note</h2>
        <form
          className='AddNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Name of Note:
              {' '}
              <Required />
            </label>
            <input
              type='text'
              title='title'
              id='title'
              placeholder='Enter note name'
              required
            />
          </div>
          <div>
            <label htmlFor='content'>
              Note:
              {' '}
              <Required />
            </label>
            <textarea
              title='content'
              id='content'
            />
          </div>
          <div>
            <select title='title'>
              {this.context.folders.map(folder => <option value={folder.id} key={folder.id}>{folder.title}</option>)}
            </select>
          </div>
          
          <div className='AddNote__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
      </ErrorBoundary>
    )
  }
}

AddNote.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
  folder_id: PropTypes.object
}

export default AddNote