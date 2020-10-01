
import { Action } from '@ngrx/store';
import Todo from '../models/Todo';
export const ADD_PRODUCT = 'ADD_TODO';
export const SELECT_TODO = 'SELECT_TODO';


export function addTodoReducer(state: Todo[] = [], action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return [...state, action.payload];
        case SELECT_TODO:
            return [...state, action.payload];
        default:
            return state;
    }
}