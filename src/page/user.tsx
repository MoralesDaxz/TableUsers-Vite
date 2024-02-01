
import { useEffect, useState } from 'react';
import { TableUsers } from '../components/TableUsers'

const User = () => {
    const [users, setUsers] = useState()
    useEffect(
        () => {
            async function promis() {
                const response = await fetch('https://randomuser.me/api?results=100&noinfo');
                const data = await response.json().then(data => setUsers(data.results))
                return data
            }
            promis()

        }, [])

    return (
        <>
            {users !== undefined && <TableUsers datos={users} />}
        </>
    );
}

export { User }