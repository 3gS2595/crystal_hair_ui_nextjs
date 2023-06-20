import { createColumnHelper } from '@tanstack/react-table'

type fileColumns = {
	auth: string
	title: string
}

const columnHelper = createColumnHelper<fileColumns>()

export const fileColumns = [
	columnHelper.accessor('auth', {
		header: () => 'author',
		cell: e =>  <a id='auth' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	}),
	columnHelper.accessor('title', {
		header: () => 'title',
		cell: e =>  <a id='title' target="_blank" href={'' + e.row.original['url']}> {e.getValue()} </a>,
	})
]
