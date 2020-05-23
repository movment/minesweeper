import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import MinePresenter from './MinePresenter';
import {
  setClick,
  setOver,
  resetGame,
  addFlag,
  removeFlag,
  finishGame,
  startGame,
} from '../reducers';
import { length, mineSize } from '../utils/createArray';
const MineContainer = ({
  array,
  mines,
  isOver,
  open,
  record,
  setClick,
  setOver,
  resetGame,
  addFlag,
  removeFlag,
  finishGame,
  startGame,
  start,
}) => {
  const [reset, setReset] = useState(false);
  const [sec, setSec] = useState(0);
  const [timer, setTimer] = useState(null);

  // 타이머 초기화
  const cleanTimer = useCallback(() => {
    clearTimeout(timer);
    setTimer(null);
  }, [setTimer, timer]);
  // 초기화
  const onReset = useCallback(() => {
    setReset(false);
    setSec(0);
    resetGame();
  }, [setReset, setSec, resetGame]);
  // 왼쪽 버튼 클릭
  const handleClick = (x, y) => {
    //처음 버튼을 클릭 한 경우
    if (!start) {
      startGame();
    }
    // 지뢰(-1)를 클릭했을 때
    array[x][y].value === -1
      ? setOver({ x, y })
      : !array[x][y].clicked && setClick({ x, y });
  };
  // 오른쪽 버튼 클릭
  const handleRight = (x, y) => {
    // Flag 상태에 따라 분기
    array[x][y].flag
      ? removeFlag({ x, y })
      : mines && !array[x][y].clicked && addFlag({ x, y });
  };

  // 게임을 Clear하거나 지뢰를 눌렀을 때
  useEffect(() => {
    if (!isOver && open >= length - mineSize) {
      cleanTimer();
      alert('Clear!!');
      record > sec && finishGame({ sec });
      onReset();
    }
    if (isOver) {
      if (!reset && window.confirm('다시 시작하겠습니까?')) {
        cleanTimer();
        onReset();
      } else {
        cleanTimer();
        setReset(true);
      }
    }
  }, [
    reset,
    sec,
    record,
    isOver,
    open,
    finishGame,
    onReset,
    setReset,
    cleanTimer,
  ]);
  // 처음 버튼을 클릭했을 때 setInterval
  useEffect(() => {
    if (start) {
      console.log('Start');
      setTimer(setInterval(() => setSec((cur) => cur + 1), 1000));
    }
  }, [start]);

  return (
    <MinePresenter
      array={array}
      mines={mines}
      isOver={isOver}
      record={record}
      onReset={onReset}
      handleClick={handleClick}
      handleRight={handleRight}
      sec={sec}
    />
  );
};

export default connect(
  (store) => ({
    array: store.array,
    mines: store.mines,
    isOver: store.isOver,
    open: store.open,
    start: store.start,
    record: store.record,
  }),
  { setClick, setOver, resetGame, addFlag, removeFlag, finishGame, startGame },
)(MineContainer);
