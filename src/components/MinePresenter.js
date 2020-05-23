import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Line = styled.div`
  display: flex;
`;
const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.clicked ? '#666666' : '#999999')};
  margin: 1px;

  &:hover {
    background-color: #cccccc;
  }
`;

const MinePresenter = ({
  array,
  mines,
  isOver,
  onReset,
  handleClick,
  handleRight,
}) => {
  return (
    <Container>
      <div>
        <span>남은 지뢰: {mines}</span>
        {<button onClick={onReset}>다시 시작하기</button>}
      </div>
      <div>
        {array?.map((cur, x) => (
          <Line key={x}>
            {cur.map((item, y) => (
              <Block
                key={`${x}${y}`}
                clicked={array[x][y].clicked}
                onClick={() => {
                  handleClick(x, y);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRight(x, y);
                }}
              >
                {array[x][y].flag
                  ? '🚩'
                  : array[x][y].clicked
                  ? array[x][y].value === -1
                    ? '💣'
                    : array[x][y].value
                    ? array[x][y].value
                    : null
                  : null}
              </Block>
            ))}
          </Line>
        ))}
      </div>
    </Container>
  );
};

export default MinePresenter;
