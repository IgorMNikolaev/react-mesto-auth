import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({username:'', email:'',})
  const history = useHistory();

  React.useEffect(() => {
    api
      .getInitialData()
      .then((response) => {
        const [cardsInfo, profileInfo] = response;
        const items = cardsInfo.map((card) => ({
          name: card.name,
          likes: card.likes,
          link: card.link,
          _id: card._id,
          owner: card.owner,
        }));
        setCards(items);
        setCurrentUser(profileInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(info) {
    api
      .profileInfoEdit(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(avatarUrl) {
    api
      .profileAvatarEdit(avatarUrl)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddNewCard(name, link) {
    api
      .postNewCard(name, link)
      .then((newcard) => {
        setCards([newcard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCardLike = ({ likes, _id }) => {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    (isLiked ? api.deleteLike(_id) : api.setLike(_id))
      .then((newCard) => {
        const newCards = cards.map((item) =>
          item._id === _id ? newCard : item
        );
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (_id) => {
    api
      .deleteCard(_id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== _id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoggIn =() => {
    setLoggedIn(true);
    setUserData(userData);
  }

  return (
<Switch>
    <CurrentUserContext.Provider value={currentUser}>

      <Header loggedIn={loggedIn}/>
      <ProtectedRoute path="/main" loggedIn={loggedIn} onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} component={Main} />
      <Route path="/sign-in">
        <Login />
      </Route>
      <Route path="/sign-up">
        <Register />
      </Route>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddNewCard}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
    </Switch>


);
}

export default App;
