export default function ResultView({ data }) {
  return (
    <ul className="list-group">
      {data.map(item => (
        <li className="list-group-item" key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}