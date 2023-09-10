import React, { useState } from 'react';

const BookForm = ({ handleSubmit, initialData = {
    title: '',
    authorFirstName: '',
    authorSurname: '',
    coverImage: '',
}}) => {

    const [book, setBook] = useState(initialData);

    const handleChange = (fields) => {
        setBook(prev => {
            return { ...prev, ...fields }
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit({ book }).catch(err => {
            console.log(err);
        });   
    }

    return (
        <form onSubmit={onSubmit}>

            <div className="form-field">
                <label htmlFor="title">Title</label>
                <input
                    type='title'
                    id='title'
                    name='title'
                    value={book.title}
                    onChange={e => {handleChange({title: e.target.value})}}
                    placeholder='title'
                />
            </div>

            <div className="form-field">
                <label htmlFor="authorFirstName">Author's first name</label>
                <input
                    type='authorFirstName'
                    id='authorFirstName'
                    name='authorFirstName'
                    value={book.authorFirstName}
                    onChange={e => {handleChange({authorFirstName: e.target.value})}}
                    placeholder='authorFirstName'
                />
            </div>

            <div className="form-field">
                <label htmlFor="authorSurname">Author's surname</label>
                <input
                    type='authorSurname'
                    id='authorSurname'
                    name='authorSurname'
                    value={book.authorSurname}
                    onChange={e => {handleChange({authorSurname: e.target.value})}}
                    placeholder='authorSurname'
                />
            </div>

            <button type='submit'>Save</button>
        </form>
    )
}

export default BookForm;