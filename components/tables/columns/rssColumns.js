export const rssColumns = [
    {
        id: "date",
        Header: 'date',
        accessor: 'date',
        width: 45,
        Cell: e => <a id='date' target="_blank" href={e.row.original['url']}> {e.value.toLowerCase()} </a>,

    },
    {
        id: "title",
        Header: 'title',
        accessor: 'title',
        width: 330,
        Cell: e => <a id='title' target="_blank" href={e.row.original['url']}> {e.value.toLowerCase()} </a>,
    },
    {
        id: "url",
        Header: 'url',
        accessor: 'url',
        width: 460,
        Cell: e => <a id='url' target="_blank" href={e.value}> {e.value.toLowerCase()} </a>,
    },
    {
        id: "null",
        Header: '',
        accessor: 'null',
        width: 115,
    },
    {
        id: "asd",
        Header: '',
        accessor: 'asd',
        width: 20,
    }
]
