import 'regenerator-runtime/runtime';
import { atom, useAtom } from 'jotai'
import { filt } from '../../pages/jotaiAtom';
import { 
	useTable, usePagination, 
	useFilters, useGlobalFilter, 
	useAsyncDebounce, useSortBy, 
	useBlockLayout, useResizeColumns 
} from 'react-table'
import React from 'react'

export function Table({ length, columns, data }) {
    var globalPageSize = length;
    const [filtValue, setFiltValue] = useAtom(filt)
    const sortees = React.useMemo(() => [{
        id: "date",
        desc: true
    }
    ], []);
    var {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        globalFilter,
        previousPage,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        minRows: 0,
        initialState: { sortBy: sortees, minRows: 20, pageIndex: 0, pageSize: globalPageSize },
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useBlockLayout,
        useResizeColumns,
    )

    // Define a default UI for filtering
    function GlobalFilter() {
        const onChange = useAsyncDebounce(filtValue => {
            setGlobalFilter(filtValue || undefined)
        }, 1)
        setFiltValue(filtValue);
        onChange(filtValue);
    }

    return (
        <>
        <div id='table'>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' up'
                                                : ' down'
                                            : ''}
                                    </span>
                                    <div
                                        {...column.getResizerProps()}
                                        className={
											`resizer ${column.isResizing ? 'isResizing' : ''}`
										}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            <div id='pagination' className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'previous'}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'next'}</button>
            </div>
            </div>
        </>
    );
}
