
import { useEffect, useState } from 'react';
import { TableUsers } from '../components/TableUsers'

const User = () => {
    const [usersValue, setUsersValue] = useState()
    useEffect(
        () => {
            async function promis() {
                const response = await fetch('https://randomuser.me/api?results=100&noinfo');
                const data = await response.json().then(data => setUsersValue(data.results))
                return data
            }
            promis()

        }, [])

    return (
        <>
            {usersValue !== undefined && <TableUsers datos={usersValue} />}
        </>
    );
}

export { User }