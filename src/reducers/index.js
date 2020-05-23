import createArray, { mineSize } from '../utils/createArray';

const CLICK_BOX = 'CLICK_BOX';
const RESET_GAME = 'RESET_GAME';
const ADD_FLAG = 'ADD_FLAG';
const REMOVE_FLAG = 'REMOVE_FLAG';
const GAME_OVER = 'GAME_OVER';
const FINISH_GAME = 'FINISH_GAME';
const START_GAME = 'START_GAME';

export const startGame = () => ({ type: START_GAME });
export const finishGame = (data) => ({ type: FINISH_GAME, data });
export const setOver = (data) => ({ type: GAME_OVER, data });
export const setClick = (data) => ({ type: CLICK_BOX, data });
export const resetGame = () => ({ type: RESET_GAME });
export const addFlag = (data) => ({ type: ADD_FLAG, data });
export const removeFlag = (data) => ({ type: REMOVE_FLAG, data });

const initialState = {
  array: createArray(),
  mines: mineSize,
  isOver: false,
  open: 0,
  start: false,
  record: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_BOX:
      return {
        ...state,
        open: state.open + 1,
        array: state.array.map((cur, xIndex) => {
          if (xIndex !== action.data.x) {
            return cur;
          }
          return cur.map((item, yIndex) => {
            if (yIndex !== action.data.y) {
              return item;
            }
            return { ...item, clicked: true };
          });
        }),
      };
    case GAME_OVER:
      return {
        ...state,
        isOver: true,
        array: state.array.map((cur, xIndex) => {
          if (xIndex !== action.data.x) {
            return cur;
          }
          return cur.map((item, yIndex) => {
            if (yIndex !== action.data.y) {
              return item;
            }
            return { ...item, clicked: true };
          });
        }),
      };
    case RESET_GAME:
      return {
        ...state,
        isOver: false,
        mines: mineSize,
        array: createArray(),
        open: 0,
        start: false,
      };
    case ADD_FLAG:
      return {
        ...state,
        mines: state.mines - 1,
        array: state.array.map((cur, xIndex) => {
          if (xIndex !== action.data.x) {
            return cur;
          }
          return cur.map((item, yIndex) => {
            if (yIndex !== action.data.y) {
              return item;
            }
            return { ...item, flag: !item.flag };
          });
        }),
      };
    case REMOVE_FLAG:
      return {
        ...state,
        mines: state.mines + 1,
        array: state.array.map((cur, xIndex) => {
          if (xIndex !== action.data.x) {
            return cur;
          }
          return cur.map((item, yIndex) => {
            if (yIndex !== action.data.y) {
              return item;
            }
            return { ...item, flag: !item.flag };
          });
        }),
      };
    case FINISH_GAME:
      return {
        ...state,
        record: action.data.sec,
      };
    case START_GAME:
      return {
        ...state,
        start: true,
      };
    default:
      return state;
  }
};

export default reducer;
