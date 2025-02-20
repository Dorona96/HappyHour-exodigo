export type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_INGREDIENT"; payload: { index: number; value: string } }
  | { type: "ADD_INGREDIENT" }
  | { type: "REMOVE_INGREDIENT"; payload: number }
  | { type: "SET_INSTRUCTIONS"; payload: string }
  | { type: "RESET_FORM" };

export const initialState = {
  name: "",
  ingredients: [""],
  instructions: "",
};

export const formReducer = (state: typeof initialState, action: FormAction) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((ing, index) =>
          index === action.payload.index ? action.payload.value : ing
        ),
      };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, ""] };
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter((_, index) => index !== action.payload),
      };
    case "SET_INSTRUCTIONS":
      return { ...state, instructions: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
