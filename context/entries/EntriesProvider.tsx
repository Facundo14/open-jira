import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../iterfaces';
import { EntriesContext, entriesReducer } from './';
import { useSnackbar  } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async(description: string) => {
        
        const { data } = await entriesApi.post('/entries', { description })

        const { entry } = data as { entry: Entry };

        dispatch({ type: '[Entry] - Add-Entry', payload: entry })

        enqueueSnackbar('Entrada creada', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }

    const updateEntry = async({_id, description, status }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put(`/entries/${_id}`, { description, status })

            const { entry } = data as { entry: Entry };

            dispatch({ type: '[Entry] - Entry-Updated', payload: entry })

            if(showSnackbar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({error})
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get('/entries');

        const { entries } = data as { entries: Entry[] };
        
        dispatch({ type: '[Entry] - Refresh-Data', payload: entries });
    }

    const deleteEntry = async({ _id }: Entry) => {
        try {
            const { data } = await entriesApi.delete(`/entries/${ _id }`);

            const { entry } = data as { entry: Entry };

            dispatch({ type: '[Entry] - Deleted-Data', payload: entry });

            enqueueSnackbar('Entrada eliminada', {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        } catch (error) {
            console.log({error})
        }
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
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
}