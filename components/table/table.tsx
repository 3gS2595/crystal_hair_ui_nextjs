import React from 'react'
import {
	Column,
	Table,
	useReactTable,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	sortingFns,
	getSortedRowModel,
	FilterFn,
	SortingFn,
	ColumnDef,
	flexRender,
	FilterFns,
	} from '@tanstack/react-table'
import {
	RankingInfo,
	rankItem,
	compareItems,
	} from '@tanstack/match-sorter-utils'
import { atom, useAtom } from 'jotai'
import {filt} from '../../pages/jotaiAtom'

declare module '@tanstack/table-core' {
	interface FilterFns {
		fuzzy: FilterFn<unknown>
	}
	interface FilterMeta {
		itemRank: RankingInfo
	}
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value)
	// Store the itemRank info
	addMeta({
		itemRank,
	})
	// Return if the item should be filtered in/out
	return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	let dir = 0
	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]?.itemRank!,
			rowB.columnFiltersMeta[columnId]?.itemRank!
		)
	}
	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export default function TableMod({len,columns,data}: {len:int, columns:Array<Column>, data:Array<Data>}) {
	const rerender = React.useReducer(() => ({}), {})[1]
	const [globalFilter, setGlobalFilter] = useAtom(filt)
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
	}),[pageIndex, pageSize])

	const table = useReactTable({
		data,
		columns,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			globalFilter,
			pagination,
		},
	})

	return (
		<>
		<div id="modularTable">
		<table>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<>
											<div
												id={header.id} 
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
			
			<span className="flex items-center gap-1">
			<div >
				<strong id='title'>
					{table.getState().pagination.pageIndex + 1} /{' '}
					{table.getPageCount()}
				</strong>
				</div>
			</span>
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
			<div>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'first'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
					>
					{'last'}
				</button>
			</div>
		</div>
		</div>
	</>
	)
}
function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}
// A debounced input react component
// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 50,
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
