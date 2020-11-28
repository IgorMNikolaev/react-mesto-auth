import { getToken } from "./token";

export default class Api {
  constructor({ baseUrl, getHeaders }) {
    this.baseUrl = baseUrl;
    this.getHeader = getHeaders;
  }

  _getInitial() {
    const token = getToken();
    return fetch(`${this.baseUrl}/cards`, {
      headers:{
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  _getProfileInfo() {
    const token = getToken();

    return fetch(`${this.baseUrl}/users/me`, {
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  profileInfoEdit(info) {
    const token = getToken();
    const { name, description: about } = info;
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  profileAvatarEdit(avatarUrl) {
    const token = getToken();
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  postNewCard(name, link) {
    const token = getToken();
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  deleteCard(_id) {
    const token = getToken();
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  setLike(cardId) {
    const token = getToken();
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  deleteLike(cardId) {
    const token = getToken();
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers:{
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      authorization: `Bearer ${token}`,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  getInitialData() {
    return Promise.all([this._getInitial(), this._getProfileInfo()]);
  }
}
