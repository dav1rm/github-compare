import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  div.actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      width: 35px;
      height: 35px;
      border: none;
      background: #63f5b8;
      color: #fff;
      font-weight: bold;
      border-radius: 3px;
      margin-left: 3px;

      i {
        font-size: 26px;
      }

      &:hover {
        background: #52d89f;
      }
    }
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #555;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;
