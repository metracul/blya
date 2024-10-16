// panels/Home.js

import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, Button, Div, Avatar } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

export const Home = ({ id, fetchedUser }) => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState(fetchedUser);

  // Определяем URL вашего API
  const API_URL = 'http://localhost:5000';

  // Функция для сохранения данных пользователя на сервере
  const saveUserData = (userId, balance) => {
    fetch(`${API_URL}/api/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, balance })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Данные сохранены:', data);
      })
      .catch(error => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };

  // Функция для загрузки данных пользователя с сервера
  const loadUserData = (userId) => {
    fetch(`${API_URL}/api/load?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.balance !== undefined) {
          setCounter(data.data.balance);
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  };

  // Хук useEffect для получения данных пользователя и загрузки баланса
  useEffect(() => {
    if (!user) {
      bridge.send('VKWebAppGetUserInfo').then(data => {
        setUser(data);
        loadUserData(data.id);
      });
    } else {
      loadUserData(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик клика по кнопке
  const handleClick = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    saveUserData(user.id, newCounter);
  };

  return (
    <Panel id={id}>
      <PanelHeader>Кликер</PanelHeader>

      {user && (
        <Div>
          <Avatar src={user.photo_200} />
          <h3>
            {user.first_name} {user.last_name}
          </h3>
        </Div>
      )}

      <Div>
        <Button size="l" stretched onClick={handleClick}>
          Кликни меня!
        </Button>
      </Div>

      <Div>
        <h2>Счетчик: {counter}</h2>
      </Div>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.object,
};
