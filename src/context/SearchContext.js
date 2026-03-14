import { createContext, useReducer } from "react";


//using SearchContext to store the search data and pass it to the components that need it 
//when selecting date for reservation : price of the room is calculated based on the number of days selected

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => { 
  switch (action.type) {
    case "NEW_SEARCH":      //when user selects a city and dates for reservation :
      return action.payload;  //payload is the data that is sent to the reducer
    case "RESET_SEARCH":   //when user clicks on the logo to go back to the home page :
      return INITIAL_STATE;  //reset the search data to initial state
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,  //to update the state of the search data 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};



















