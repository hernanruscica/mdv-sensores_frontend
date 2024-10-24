import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js';
import { ENV } from '../../context/env.js';

function ChannelForm({ id }) {

    return (
        <>
            <span>{`ChannelForm with id: ${id}`}</span>
        </>
    )
}

export default ChannelForm;