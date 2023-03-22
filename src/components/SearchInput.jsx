import { useDispatch } from 'react-redux'
import { changeSearchQuery } from '../redux/actions/actionCreator'

export default function SearchInput() {
  const dispatch = useDispatch();

  const handleChangeQuery = evt => {
    dispatch(changeSearchQuery(evt.target.value))
  }

  return (
    <input 
      type="text" 
      className="w-100 border rounded p-3"
      onChange={handleChangeQuery}
    />
  )
}