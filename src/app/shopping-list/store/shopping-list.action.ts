import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] AddIngredient';
export const ADD_INGREDIENTS = '[ShoppingList] AddIngredients';
export const UPDATE_INGREDIENT = '[ShoppingList] UpdateIngredient';
export const DELETE_INGREDIENT = '[ShoppingList] DeleteIngredient';
export const START_EDIT = '[ShoppingList] StartEdit';
export const STOP_EDIT = '[ShoppingList] StopEdit';

export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action{
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action{
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action{
  readonly type = START_EDIT;
  constructor(public payload: number){}
}

export class StopEdit implements Action{
  readonly type = STOP_EDIT;
}

export type slActions =
        AddIngredient
      | AddIngredients
      | UpdateIngredient
      | DeleteIngredient
      | StartEdit
      | StopEdit;
