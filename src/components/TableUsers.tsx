/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from 'react';
import {
    Column,
    Table as ReactTable,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import iconDown from '../assets/iconDown.svg'
import iconLeft from '../assets/iconLeft.svg'
import iconLeftDouble from '../assets/iconLeftDouble.svg'
import { Result } from '../interfaces/users';
import { UserInformation } from './UserInformation';

type Props = {
    datos: Result[]
}
const columnHelper = createColumnHelper<Result>()

const columna = [
    columnHelper.accessor(row => row.picture?.medium, {
        id: 'img',
        enableSorting: false,
        header: () => <p>Foto</p>,
        cell: info => <div id='img' className='flex items-center justify-center'>
            <img src={`${info.row.original.picture?.medium}`} width={40} height={40} alt='imagen' />
        </div>,
    }),
    columnHelper.accessor(row => row.dob?.age, {
        id: 'age',
        enableSorting: false,
        header: () => <p>Age</p>,
        cell: info => <p className='text-center'>{info.row.original.dob?.age}</p>,
    }),
    columnHelper.accessor(row => row.gender, {
        id: 'gender',
        enableSorting: true,
        header: () => <p className='cursor-pointer underline'>Gender</p>,
        cell: info => <p className='text-center'>{info.row.original.gender}</p>,
    }),
    columnHelper.accessor(row => row.name?.first, {
        id: 'name',
        enableSorting: true,
        header: () => <p className='cursor-pointer underline'>Name</p>,
        cell: info => <p id={'name'} className='text-white'>{info.row.original.name?.first}</p>,
    }),
    columnHelper.accessor(row => row.name?.last, {
        id: 'last',
        enableSorting: false,
        header: () => <p>Last</p>,
        cell: info => info.row.original.name?.last,
    }),
    columnHelper.accessor(row => row.location?.country, {
        id: 'country',
        enableSorting: true,
        header: () => <p className='cursor-pointer underline'>Country</p>,
        cell: info => info.row.original.location?.country,
    }),
    columnHelper.accessor(row => row.location?.city, {
        id: 'city',
        enableSorting: false,
        header: () => <p>City</p>,
        cell: info => info.row.original.location?.city,
    }),
]
const TableUsers = ({ datos }: Props) => {
    const table = useReactTable({
        data: datos,
        columns: columna,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const [userFiltered, setUserFiltered] = useState<Result[]>([]);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => { table.setPageSize(5) }, [table]);

    const findUser = (userID: string | undefined) => {
        const filterUser = datos.filter(value => value.login?.uuid === userID);
        setUserFiltered(filterUser);
        setModal(true);
        return;
    }
    return (
        <div className='w-full flex flex-col items-center gap-4'>
            {modal && <UserInformation userInfo={userFiltered} setModal={setModal} />}
            <h1 className='font-bold text-3xl'>Random Users</h1>
            {/*  Control de row mostrados*/}
            <div className='w-[90%] flex gap-2 items-center py-2'>
                <p>Usuarios en tabla </p>
                <select
                    /* Valor inicial 5 */
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => { table.setPageSize(Number(e.target.value)) }}>
                    {[5, 10, 20, 30, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>{pageSize}</option>
                    ))}
                </select>
            </div>
            <table className='w-[90%]' >
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className='h-6' key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                /* Control sort */
                                const isSortable = header.column.getCanSort();
                                const sort = header.column.getIsSorted();
                                return (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className='border border-[#AFAFAF] p-1'
                                    >
                                        <div className='flex items-center justify-center'>
                                            {/* Iconos Sort */}
                                            {isSortable && sort === "asc"
                                                ? <img src={iconDown} width={24} height={24} alt='Icon' />
                                                : isSortable && sort === "desc"
                                                    ? <img src={iconDown} className=' rotate-180' width={24} height={24} alt='Icon' />
                                                    : ''}
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </div>
                                        {/* Filter aplicado en columnas */}
                                        {['country', 'name'].includes(header.column.id)
                                            ? (
                                                <Filter column={header.column} table={table} />
                                            ) : ''}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {table.getRowModel().rows.map((row, index) => {
                        return (
                            <tr className={index % 2 == 0 ? 'bg-[#161616] hover:bg-[#172d3a]' : 'hover:bg-[#172d3a]'} key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td onClick={() => findUser(row.original.login?.uuid)} className={'py-2 px-1 border border-[#AFAFAF] hover:cursor-pointer'} key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* Paginacion */}
            <div className="w-full flex items-center justify-center gap-4 py-2">
                {/* Podemos jugar con table.getCanPreviousPage() para habilitar o desabilitar es boolean */}
                <p>Prev</p>
                <img
                    src={iconLeftDouble}
                    width={40}
                    height={40}
                    className="border hover:border-2 rounded p-1 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => table.getCanPreviousPage() && table.setPageIndex(0)}
                    alt='left'
                />
                <img
                    src={iconLeft}
                    width={40}
                    height={40}
                    className="border hover:border-2 rounded p-1 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => table.getCanPreviousPage() && table.previousPage()}
                    alt='left'
                />
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <img
                    src={iconLeft}
                    width={40}
                    height={40}
                    className=" rotate-180 border hover:border-2 rounded p-1 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => table.getCanNextPage() && table.nextPage()}
                    alt='rigth'
                />
                <img
                    src={iconLeftDouble}
                    width={40}
                    height={40}
                    className="rotate-180 border hover:border-2 rounded p-1 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => table.getCanNextPage() && table.setPageIndex(table.getPageCount() - 1)}
                    alt='rigth'
                />
                <p>Next</p>
            </div>
        </div>
    );
};
/* Function filter */
function Filter({
    column,
    table,
}: {
    column: Column<any, any>
    table: ReactTable<any>
}) {

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);
    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-8 border shadow rounded text-sm text-black font-normal text-center"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-8 border shadow rounded text-sm text-black font-normal text-center"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search`}
            className="w-16 bg-white text-sm text-black font-normal text-center border shadow rounded"
        />
    )
}
export { TableUsers };