import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../iterfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children?: React.ReactNode | undefined
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesPovider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = async(description: string) => {
        
        const { data } = await entriesApi.post('/entries', { description })

        const { entry } = data;

        dispatch({ type: '[Entry] - Add-Entry', payload: entry as Entry })
    }

    const updateEntry = async({_id, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put(`/entries/${_id}`, { description, status })

            const { entry } = data;

            dispatch({ type: '[Entry] - Entry-Updated', payload: entry as Entry })

        } catch (error) {
            console.log({error})
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get('/entries');

        const { entries } = data;
        
        dispatch({ type: '[Entry] - Refresh-Data', payload: entries as Entry[] });
    }
    
    useEffect(() => {
      refreshEntries();
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
}