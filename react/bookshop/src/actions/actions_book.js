import axios from 'axios';
import { setError } from './actions';
import _ from 'lodash';

const BOOK_URL = `${process.env.REACT_APP_API_URL}/api/books`;

export const BOOK_ACTIONS = {
    FILTER: 'BOOK_FILTER',
    UPDATE: 'BOOK_UPDATE',
    DELETE: 'BOOK_DELETE',
    CREATE: 'BOOK_CREATE',
};

export function filterBooks() {
    return (dispatch, getState) => {
        const filter = getState().filter;
        let refresh = false;

        if (getState().books && getState().books !== null) {
            const booksFilter = getState().books.filter;
            if (!_.isEqual(filter.publicationIds, booksFilter.publicationIds)
                || !_.isEqual(filter.categoryIds, booksFilter.categoryIds)
                || !_.isEqual(filter.authorIds, booksFilter.authorIds)) {
                refresh = true;
            }
        } else {
            refresh = true;
        }

        if (!refresh) {
            //do nothing
            return;
        }

        const url = `${BOOK_URL}/filter?publicationIds=${(filter.publicationIds).map(f => f.id)}&categoryIds=${filter.categoryIds.map(f => f.id)}&authorIds=${filter.authorIds.map(f => f.id)}`
        axios.get(url)
            .then(response => {
                dispatch(
                    {
                        type: BOOK_ACTIONS.FILTER,
                        payload: response,
                        filter: Object.assign({}, filter)
                    }
                );
            }).catch(error => {
                dispatch(
                    setError(error.response.data, BOOK_ACTIONS.FILTER)
                );
            })
    }
}

export function fetchBooks() {
    return dispatch => {
        dispatch(filterBooks({ publicationIds: [], categoryIds: [], authorIds: [] }))
    }
}