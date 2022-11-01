import { Ingredient } from "../../shared/ingredient.model";
import * as slActions from './shopping-list.action';

export interface State{
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = { ingredients:[ new Ingredient("Apples", 5), new Ingredient("Tomato", 10)],
                      editedIngredient: null,
                      editedIngredientIndex: -1
                     };

export function shoppingListReducer(state = initialState, action: slActions.slActions){
           switch(action.type){
            case slActions.ADD_INGREDIENT:
              return {
                ...state, ingredients: [...state.ingredients, action.payload]};

            case slActions.ADD_INGREDIENTS:
              return { ...state, ingredients: [...state.ingredients, ...action.payload]};

            case slActions.UPDATE_INGREDIENT:
              const ingredient = state.ingredients[state.editedIngredientIndex];
              const updatedIngredient = {...ingredient, ...action.payload};
              const newIngredients = [...state.ingredients]
              newIngredients[state.editedIngredientIndex]= updatedIngredient;
              return {...state, ingredients: newIngredients, editedIngredient: null, editedIngredientIndex: -1};

            case slActions.DELETE_INGREDIENT:
              return {
                ...state, ingredients: [...state.ingredients].filter( (ig, igIndex) => {
                  return igIndex !== state.editedIngredientIndex;
                }), editedIngredient: null, editedIngredientIndex: -1
              }

            case slActions.START_EDIT:
              return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
              }

            case slActions.STOP_EDIT:
              return {
                  ...state, editedIngredientIndex: -1,
                  editedIngredient: null
              }

            default:
                return state;
           }
}
