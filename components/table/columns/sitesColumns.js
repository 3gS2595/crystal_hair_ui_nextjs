export const sitesColumns = [

    {
        width: 190,
        Header: 'site',
        accessor: 'site',
        Cell: e => <a id='names' target="_blank" href={e.value}> {e.value} </a>,
    },
    {
        id:'count',
        width: 730,
        Header: 'count',
        accessor: 'count',
        Cell: e => <a id='count' target="_blank" href={e.row.original['url']}> {e.value} </a>,
    }
]
