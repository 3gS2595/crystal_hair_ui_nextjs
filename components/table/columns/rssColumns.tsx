import { createColumnHelper } from '@tanstack/react-table'

type rss = {
	date: string
	title: string
	url: string
}

const columnHelper = createColumnHelper<rss>()

export const rssColumns = [
	columnHelper.accessor('date', {
		header: () => 'date',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('title', {
		header: () => 'title',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('url', {
		header: () => 'url',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	})
]
