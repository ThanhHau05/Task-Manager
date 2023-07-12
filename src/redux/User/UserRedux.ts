import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_USER: 'setCurrentUser';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUser: (user: string) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  currentUser: string;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentUser: ['user'],
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentUser: 'test user',
});

const setCurrentUser = (state: ImmutableMyType, { user }: { user: string }) =>
  state.merge({ currentUser: user });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_USER]: setCurrentUser,
});
