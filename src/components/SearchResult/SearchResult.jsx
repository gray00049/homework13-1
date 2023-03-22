import { useSelector } from "react-redux"
import LoadingView from './LoadindView'
import ResultView from "./ResultView"
import ErrorView from "./ErrorView"

export default function SearchResult() {
  const {query, data, error, loading} = useSelector(state => state.search);

  let result;

  if (loading) {
    result = <LoadingView />
  } else if (error) {
    result = <ErrorView />
  } else if (query == '') {
    result = <p>Введите свой запрос...</p>
  } else if (data.length == 0) {
    result = <p>Данных по текущему запросу не существует</p>
  } else {
    result = <ResultView data={data} />
  }

  return (
    <div className="mt-3">
      {result}
    </div>
  )
}