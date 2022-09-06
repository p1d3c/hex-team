import './ListRow.css';

function ListRow(props) {
  const {item} = props;

  return (
    <div className='row'>
      <ol className='row__list'>
        <li className='row__list-item'>
          <a className='row__link' href={`http://79.143.31.216/s/${item.short}`} target='_blank'>
            {item.short}
          </a>
        </li>
        <li className='row__list-item'>
          <a className='row__link' href={item.target} target='_blank'>
            {item.target}
          </a>
        </li>
        <li className='row__list-item'>{item.counter}</li>
      </ol>
    </div>
  );
}

export default ListRow;
