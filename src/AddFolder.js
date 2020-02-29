import React, { Component } from  'react'
import './AddFolder.css'
import config from './config'
import ApiContext from './ApiContext'
import ErrorBoundary from './ErrorBoundary'
import PropTypes from 'prop-types'

const Required = () => (
  <span className='AddFolder__required'>*</span>
)

class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    const { title } = e.target
    const folder = {
      title: title.value
    }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
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
        data.name = title.value
        this.context.addFolder(data)
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
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <form
          className='AddFolder__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddFolder__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Name of Folder
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Enter folder name'
              required
            />
          </div>
          
          <div className='AddFolder__buttons'>
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

AddFolder.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  folder: PropTypes.object
}

export default AddFolder