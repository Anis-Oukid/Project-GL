import { AnnoncesContext } from "../context/AnnoncesContext"
import { useContext } from "react"

export const useAnnoncesContext = () => {
  const context = useContext(AnnoncesContext)

  if(!context) {
    throw Error('Error')
  }

  return context
}