
import { createContext, useReducer } from 'react'

export const AnnoncesContext = createContext()

export const annonceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANNONCES':
      return { 
        annonces: action.payload 
        
      }
      
    case 'CREATE_ANNONCE':
      return { 
        annonces: [state.annonces] 
      }
    case 'DELETE_ANNONCE':
      return { 
        annonces: state.annonces.filter(item => item._id !== action.payload) 
      }
    default:
      return state
  }

}

export const AnnoncesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(annonceReducer, { 
    annonces: null
  })
  console.log("state = ", state)
  return (
    <AnnoncesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AnnoncesContext.Provider>
  )
  }
