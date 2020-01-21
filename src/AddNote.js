import React, { Component } from  'react'
import './AddNote.css'
import config from './config'
import ApiContext from './ApiContext'

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
    const { title, note } = e.target
    const notes = {
      title: title.value,
      note: note.value
    }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(notes),
      
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
        title.value = ''
        note.value = ''
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
              name='title'
              id='title'
              placeholder='Enter note name'
              required
            />
          </div>
          <div>
            <label htmlFor='note'>
              Note:
              {' '}
              <Required />
            </label>
            <textarea
              name='note'
              id='note'
            />
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
    )
  }
}

export default AddNote