export const namesColumns = [
    {
        id: "title",
        width: 190,
        Header: 'name',
        accessor: 'name',
        Cell: e => <a id='names' target="_blank"> {e.value} </a>,
    },
    {
        id: "count",
        width: 730,
        Header: 'count',
        accessor: 'count',
        Cell: e => <a id='count' target="_blank"> {e.value} </a>,
    },
    {
        width: 10,
        Header: 'urls',
        accessor: 'urls',
        Cell: e => <a id='auth' target="_blank"> {e.value} </a>,
    }
]
