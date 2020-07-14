import React, { Component } from 'react'
import { urlValidation } from '../utils/urlValidation'

class BookmarkForm extends Component {
  state = {
    websiteAddress: '',
    errorMessage: false,
    type: ''
  }

  // Event récupéré lors de l'appui sur le bouton d'ajout de bookmark
  // Vérifie si le bookmark correspond à la vérification d'url puis l'ajout est remonté sur App.js
  handleSubmit = event => {
    event.preventDefault();
    let userInput = this.state.websiteAddress;
    if(urlValidation(userInput)){
      this.props.addWebsite(userInput);
      this.setState({
        websiteAddress: '',
        errorMessage: false
      })
    } else {
      this.setState({ errorMessage: true })
    }
  };

  // onChangeValue pour récupérer les infos de l'input de l'ajout de bookmark
  onChangeValue = event => {
    this.setState({ websiteAddress: event.target.value });
  };

  render() {
    return (
      <div className="bookmark-form-container">
        <form onSubmit={this.handleSubmit} className="bookmark-form">
            <input
                type="text"
                value={this.state.websiteAddress}
                onChange={this.onChangeValue}
                placeholder="Ajouter un bookmark"
                autoFocus
                required
            />
            <input type="submit" value="Submit" />
        </form>
        {this.state.errorMessage && (
          <div id="error-message">L'url ne correspond pas à Vimeo ou Flickr</div>
        )}
      </div>
    )
  }
}

export default BookmarkForm