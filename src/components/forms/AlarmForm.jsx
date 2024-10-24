import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js';
import { ENV } from '../../context/env.js';

function AlarmForm({ id }) {

    return (
        <>
            <span>{`AlarmForm with id: ${id}`}</span>
        </>
    )
}

export default AlarmForm;