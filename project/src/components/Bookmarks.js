import React, { Component } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Bookmarks extends Component {
  
    constructor() {
        super();
        this.state = {
            items: [],
            data_loaded: false,
            keywords: [],
            values: '',
            show: 'none',
        };
    }

    // Récupération des infos des bookmarks lors de l'appel de la page
    componentDidMount(){
      var myHeaders = new Headers( { 'Origin': 'https://javascript.info' })
      if (this.props.website.includes('vimeo')){
        fetch("https://vimeo.com/api/oembed.json?url=" + this.props.website)
        .then(res => res.json())
        .then(result => {
          this.setState({
              data_loaded: true,
              items: result
          })
        })
      }else{ 
        fetch("https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/oembed/?format=json&url=" + this.props.website, {headers : myHeaders})
        .then(res => res.json())
        .then(result => {
            this.setState({
                data_loaded: true,
                items: result
            })
        })
      }
    }

    // Récupération des infos des bookmarks lors d'un update de la page (suppresion d'un bookmark par ex)
    componentDidUpdate(){
      var myHeaders = new Headers( { 'Origin': 'https://javascript.info' })
      if (this.props.website.includes('vimeo')){
        fetch("https://vimeo.com/api/oembed.json?url=" + this.props.website)
        .then(res => res.json())
        .then(result => {
          this.setState({
              data_loaded: true,
              items: result
          })
        })
      }else{ 
        fetch("https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/oembed/?format=json&url=" + this.props.website, {headers : myHeaders})
        .then(res => res.json())
        .then(result => {
            this.setState({
                data_loaded: true,
                items: result
            })
        })
      }
    }

    // Suppression d'un bookmark, remonté sur App.js
    handleDelete = () => {
        this.props.deleteWebsite(this.props.id);
    };

    // Event récupéré lors de l'appui sur le bouton submit de l'édition de mots-clés
    handleEditSubmit = event => {
      event.preventDefault();
      this.onAddItem();
    };

    // Suppression d'un mots-clé
    handleDeleteKeyword = index => {
      this.setState(state => {
        const keywords = state.keywords.filter((item, id) => index !== id);
        return {
          keywords,
        };
      });
      this.toggleEditForm()
    }

    // onChangeValue pour récupérer les infos de l'input de l'édition de mots-clés
    onChangeValue = event => {
      this.setState({ value: event.target.value });
    };

    // Ajout d'un mot-clé
    onAddItem = () => {
      let newKeywordList = this.state.keywords;
      if(!this.state.keywords.includes(this.state.value)){
        newKeywordList.push(this.state.value);
      }
      this.toggleEditForm(newKeywordList)
    };

    // Event récupéré lors de l'appui sur le bouton edit
    toggleEditForm = value => {
      this.state.show === 'none'
            ? this.setState({ show: null })
            : this.setState({ show: 'none' });
    };

    // Changement des secondes récupérées dans le json vimeo en Heures Minutes Secondes
    secondToHms(d){
      d = Number(d)
      var h = Math.floor(d / 3600)
      var m = Math.floor(d % 3600 / 60)
      var s = Math.floor(d % 3600 % 60)

      var hDisplay = h > 0 ? h + (h === 1 ? " heure " : " heures ") : ""
      var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : ""
      var sDisplay = s > 0 ? s + (s === 1 ? " seconde" : " secondes") : ""

      return hDisplay + mDisplay + sDisplay
    }

    render() {
        const { items, data_loaded, keywords, value } = this.state

        if(data_loaded){
            return (
                <Container className="website-choice-container">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>URL</th>
                          <th>Titre</th>
                          <th>Auteur</th>
                          <th>Date d'ajout</th>
                          <th>Largeur</th>
                          <th>Hauteur</th>
                          <th>Durée</th>
                          <th>Mots-clés</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="website-choice">
                            <a href={`${this.props.website}`} target="_blank" rel="noopener noreferrer">
                            {this.props.website}
                            </a>
                          </td>
                          <td>
                            { items.title }
                          </td>
                          <td>
                            { items.author_name }
                          </td>
                          <td>
                            { items.upload_date }
                          </td>
                          <td>
                            { items.width }
                          </td>
                          <td>
                            { items.height }
                          </td>
                          <td>
                            { this.secondToHms(items.duration) }
                          </td>
                          <td>
                            <div>
                            { keywords.map((item, index) => (
                              <li key={item}> { item }
                              </li>
                            ))}
                            </div>
                          </td>
                          <td>
                          <Button variant="info" className="edit-btn" onClick={this.toggleEditForm} size="sm">
                              Edit
                          </Button>
                          <Button variant="danger" className="delete-btn" onClick={this.handleDelete} size="sm">
                              x
                          </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div style={{ display: this.state.show }}>
                    { keywords.map((item, index) => (
                      <li key={item}> { item } 
                      <Button variant="danger" className="delete-btn" onClick={() => this.handleDeleteKeyword(index)} size="sm">
                          x
                      </Button>
                      </li>
                    ))}
                    <form
                        className="editing-form"
                        onSubmit={this.handleEditSubmit}
                    >
                        <input
                            id="editing-textbox"
                            placeholder="Ajouter un mot-clé"
                            value={value || ''}
                            onChange={this.onChangeValue}
                            required
                        />
                        <input type="submit" value="submit" />
                    </form>
                    </div>
                    
                </Container>
            );
        } else {
            return(
                <Container>
                  <p> Data Loading... </p>
                </Container>
            )
        }
    }
}

export default Bookmarks;