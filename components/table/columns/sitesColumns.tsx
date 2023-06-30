import { createColumnHelper } from '@tanstack/react-table'

type rss = {
	date: string
	title: string
	url: string
}

const columnHelper = createColumnHelper<rss>()

export const sitesColumns = [
	columnHelper.accessor('site', {
		id:'title',
		header: () => 'site',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('count', {
		id:'count',
		header: () => 'count',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	})
]
