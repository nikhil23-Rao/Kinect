import { gql } from '@apollo/client';

export const GET_ALL_MESSAGES = gql`
  subscription GetAllMessages {
    GetAllMessages {
      body
      messageid
      author {
        username
        email
        profile_picture
        id
      }
      image
      groupid
      time
      date
    }
  }
`;

export const GET_USERS_TYPING = gql`
  subscription GetUsersTyping {
    GetUsersTyping {
      username
      typing
      email
      dark_theme
      online
      id
      chaton
    }
  }
`;
