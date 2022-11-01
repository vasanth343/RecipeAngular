import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.action';

export interface State{
    recipes: Recipe[]
}

const initialState: State = { recipes:[] };

export function recipesReducer(state = initialState, action:RecipesActions.RecipeActions){
    switch(action.type){
        case RecipesActions.SET_RECIPES:
            return {...state, recipes:[...action.payload]};
        case RecipesActions.ADD_RECIPE:
            return {...state, recipes:[...state.recipes, action.payload]};
        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = { ...state.recipes[action.payload.index], ...action.payload.recipe};
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {...state, recipes: updatedRecipes};
        case RecipesActions.DELETE_RECIPE:
            return {...state, recipes: state.recipes.filter((value, index) => {
                return index != action.payload;
            })}    
        default:
            return state;
    }
}