import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js';
import { ENV } from '../../context/env.js';

function LocationForm({ id }) {

    return (
        <>
            <span>{`LocationForm with id: ${id}`}</span>
        </>
    )
}

export default LocationForm;