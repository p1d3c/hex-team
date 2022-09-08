import './TableComponent.css';
import 'antd/dist/antd.min.css';
import {Table, Typography} from 'antd';

function TableComponent(props) {
  const {statistics} = props;

  const dataSource = statistics.map((item) => ({...item, key: item.id}));

  const EllipsisMiddle = ({suffixсount, children}) => {
    const start = children.slice(0, children.length - suffixсount).trim();
    const suffix = children.slice(-suffixсount).trim();

    return (
      <Typography.Text ellipsis={{suffix}} style={{maxWidth: '560px', width: '90%', overflow: 'hidden'}}>
        {start}
      </Typography.Text>
    );
  };

  const columns = [
    {
      title: 'Короткая ссылка',
      dataIndex: 'short',
      render: (dataText) => {
        return (
          <Typography.Text copyable={{text: `http://79.143.31.216/s/${dataText}`}}>
            <a href={`http://79.143.31.216/s/${dataText}`} target='_blank' rel='noreferrer'>
              {dataText}
            </a>
          </Typography.Text>
        );
      },
    },
    {
      title: 'Исходная ссылка',
      dataIndex: 'target',
      sorter: {
        compare: (a, b) => {
          return a.target.length - b.target.length;
        },
        multiple: 2,
      },
      render: (text) => {
        return <EllipsisMiddle suffixсount={3}>{text}</EllipsisMiddle>;
      },
    },
    {
      title: 'Количество переходов',
      dataIndex: 'counter',
      sorter: {
        compare: (a, b) => {
          return a.counter - b.counter;
        },
        multiple: 1,
      },
    },
  ];

  const onChange = (pagination) => {
    const isLastPage = !(pagination.current * pagination.pageSize < dataSource.length);

    if (isLastPage) {
      props.handleAddStatistics();
    }
  };

  return (
    <Table
      className='table'
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      pagination={{defaultPageSize: '5', showSizeChanger: true, pageSizeOptions: [5, 10, 15]}}
      size='small'
    />
  );
}

export default TableComponent;
