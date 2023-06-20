import React from 'react'
import {
	Column,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	flexRender,
} from '@tanstack/react-table'
import { atom, useAtom } from 'jotai'
import {filt} from '../../pages/jotaiAtom'

export default function TableMod({len,columns,data}: {len:int, columns:Array<Column>, data:Array<Data>}) {
	const rerender = React.useReducer(() => ({}), {})[1]
	const [globalFilter, setGlobalFilter] = useAtom(filt); 
	const [{ pageIndex, pageSize }, setPagination] = (
		React.useState<PaginationState>({
			pageIndex: 0,
			pageSize: len,
		})
	)
	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	)
	
	const table = useReactTable({
		data,
		columns,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			globalFilter,
			pagination,
		},
	})

	return (
	<>
		<table id='table'>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<>
											<div
												{...{
													className: header.column.getCanSort()
														? 'cursor-pointer select-none'
														: '',
													onClick: header.column.getToggleSortingHandler(),
												}}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: ' 🔼',
													desc: ' 🔽',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										</>
									)}
								</th>
							)
						})}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => {
								return (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>

		<div id='pagination' className="pagination">
			<button
				className="border rounded p-1"
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				{'prev'}
			</button>
			<button
				className="border rounded p-1"
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				{'next'}
			</button>
		</div>
	</>
	)
}

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = React.useState(initialValue)

	React.useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value])

	return (
		<input {...props} value={value} onChange={e => setValue(e.target.value)} />
	)
}
