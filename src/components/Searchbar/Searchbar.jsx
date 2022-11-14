import  { useState } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

   const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            return alert ('Please add a request!');
        }
        
        onSubmit(query);
        setQuery('');
    }


    return (
        <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
}


Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
  }