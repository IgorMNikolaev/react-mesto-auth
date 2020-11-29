import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { getToken, removeToken, setToken } from "../utils/token";

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
  const [message, setMessage] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const history = useHistory();

  const BASE_URL = "https://api.numberfive.students.nomoredomains.monster";


const api = new Api({
  baseUrl: "https://api.numberfive.students.nomoredomains.monster",
});

const getData = () => {
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
        setUserData({email:profileInfo.email})

      })
      .catch((error) => {
        console.log(error);
      });
}

  React.useEffect(() => {
    tokenCheck();
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
    setLoading(true);
    api
      .profileInfoEdit(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }

  function handleUpdateAvatar(avatarUrl) {
    setLoading(true);
    api
      .profileAvatarEdit(avatarUrl)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }

  function handleAddNewCard(name, link) {
    setLoading(true);
    api
      .postNewCard(name, link)
      .then((newcard) => {
        setCards([newcard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }

  const handleCardLike = ({ likes, _id }) => {
    const isLiked = likes.some((i) => i === currentUser._id);
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
  };

  const tokenCheck = () => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getContent(jwt).then((res) => {
      if (res) {
        getData();
        setLoggedIn(true);
        history.push("/");
      }
    });
  };

  function onSignOut() {
    removeToken();
    history.push("/sign-in");
  }

  const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          setMessage("");
          isSuccess(true);
          infoTooltipOpen();
          history.push("/sign-in");
        } else {
          setMessage("Что-то пошло не так!");
          isSuccess(false);
          infoTooltipOpen();
        }
      });
  };

  const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return data.token;
        } else {
          return;
        }
      })
      .then((token) => {
        if (!token) {
          setMessage("Что-то пошло не так!");
        }
        if (token) {
          setToken(token);
          setMessage("");
          handleLogin();
          getData();
          history.push("/");
        }
      });
  };

  const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  };

  const isSuccess = (x) => setRegisterSuccess(x);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignOut={onSignOut} userData={userData} />
      <Switch>
        <Route path="/sign-in">
          <Login authorize={authorize} message={message} />
        </Route>
        <Route path="/sign-up">
          <Register register={register} message={message} />
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
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddNewCard}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
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
