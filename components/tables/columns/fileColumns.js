export const fileColumns = [

    {
        width: 160,
        Header: 'author',
        accessor: 'auth',
        Cell: e => <a id='auth' target="_blank" href={e.row.original['url']}> {e.value} </a>,
    },
    {
        width: 730,
        Header: 'title',
        accessor: 'title',
        Cell: e => <a id='title' target="_blank" href={e.row.original['url']}> {e.value} </a>,
    },
    {
        width: 10,
        Header: '.​',
        accessor: 'as'    }
]
