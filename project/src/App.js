import React, { Component } from 'react'
import { Container, Table } from 'react-bootstrap';
import BookmarkForm from './components/BookmarkForm'
import Bookmarks from './components/Bookmarks'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        websites: [],
    };
  }

  componentDidMount = () => {
    this.loadLocalStorage();
  };

  // Permet le chargement du LocalStorage afin de récupérer les bookmarks enregistrés localement sous l'item websites
  loadLocalStorage = () => {
    const cachedWebsites = localStorage.getItem('websites');
    if (cachedWebsites !== null) {
        const array = cachedWebsites.split(',');
        this.setState({
            websites: array
        });
    }
  };

  // Permet d'envoyer la valeur dans le LocalStorage dans l'item websites
  sendLocalStorage = value => {
    value.length === 0
        ? localStorage.clear()
        : localStorage.setItem('websites', value);
  };

  // Fonction utilisée dans BookmarkForm.js
  // Permet d'ajouter le nouveau bookmark dans la liste de state.websites et l'envoie vers updateWebsiteList
  addWebsite = newWebsite => {
    let newWebsiteList = this.state.websites;
    newWebsiteList.push(newWebsite);
    this.updateWebsiteList(newWebsiteList);
  };

  // Fonction utilisée dans Bookmark.js
  // Permet de supprimer le bookmark avec l'id correspondant de la liste de state.websites et l'envoie vers updateWebsiteList
  deleteWebsite = id => {
    let newWebsiteList = this.state.websites.filter((website, index) => {
        return index !== id;
    });
    this.updateWebsiteList(newWebsiteList);
  };

  // Update la liste de websites et envoie la nouvelle version dans le LocalStorage
  updateWebsiteList = value => {
    this.setState({
        websites: value
    });
    this.sendLocalStorage(value);
  };

  render() {
    let { websites } = this.state
    websites = websites.map((website, index) => {
      return (
                <Bookmarks 
                  website={website}
                  key={index}
                  id={index}
                  deleteWebsite={this.deleteWebsite}
                  type={this.type}
                >
                {website}
                </Bookmarks>
      );
    })
    return (
      <div>
        <Container>
          <BookmarkForm addWebsite={this.addWebsite}/>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bookmark Manager</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ websites }</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App