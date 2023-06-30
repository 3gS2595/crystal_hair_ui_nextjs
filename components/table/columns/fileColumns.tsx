import { createColumnHelper } from '@tanstack/react-table'

type fileColumns = {
	auth: string
	title: string
}

const columnHelper = createColumnHelper<fileColumns>()

export const fileColumns = [
	columnHelper.accessor('auth', {
		id: "title",
		header: () => 'author',
		cell: e =>  <a id='title' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('title', {
		id: "count",
		header: () => 'title',
		cell: e =>  <a id='url' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	})
]
