import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js';
import { ENV } from '../../context/env.js';

function DataloggerForm({ id }) {

    return (
        <>
            <span>{`DataloggerForm with id: ${id}`}</span>
        </>
    )
}

export default DataloggerForm;