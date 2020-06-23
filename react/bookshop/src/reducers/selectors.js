import { createSelector } from 'reselect';

const getByCategoryById = (state, categoryId) => state.categories_flat?
 state.categories_flat[categoryId] : undefined;

export const makeGetCategory = () => {
    return createSelector(
        [getByCategoryById],
        (category) => {
            return category;
        }
    )
}

const getAuthorById = (state, authorId) => state.authors?
 state.authors.get(authorId) : undefined;

export const makeGetAuthor = () => {
    return createSelector(
        [getAuthorById],
        (author) => {
            return author;
        }
    )
}