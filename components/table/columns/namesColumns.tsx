import { createColumnHelper } from '@tanstack/react-table'

type rss = {
	date: string
	title: string
	url: string
}

const columnHelper = createColumnHelper<rss>()

export const namesColumns = [
	columnHelper.accessor('name', {
		id: "title",
		header: () => 'name',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('count', {
		id: "count",
		header: () => 'count',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('urls', {
		id: "url",
		header: () => 'url',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	})
]
