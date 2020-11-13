import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { getToken, removeToken } from "../utils/token";
import { getContent } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "" });
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

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

  function infoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
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

  const handleLogin = () => {
    setLoggedIn(true);
    setUserData(userData);
  };

  const tokenCheck = () => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getContent(jwt).then((res) => {
      if (res) {
        const userData = {
          email: res.data.email,
        };
        setLoggedIn(true);
        setUserData(userData);
        history.push("/");
      }
    });
  };

  function onSignOut() {
    removeToken();
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignOut={onSignOut} userData={userData} />
      <Switch>
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register
            infoTooltipOpen={infoTooltipOpen}
            setSuccess={setRegisterSuccess}
          />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          component={Main}
        />
      </Switch>
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
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={registerSuccess}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
