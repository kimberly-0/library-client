import React, { useState } from 'react';

const MemberForm = ({ handleSubmit, initialData = {
    firstName: '',
    surname: '',
}}) => {

    const [member, setMember] = useState(initialData);

    const handleChange = (fields) => {
        setMember(prev => {
            return { ...prev, ...fields }
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit({ member }).catch(err => {
            console.log(err);
        });   
    }

    return (
        <form onSubmit={onSubmit}>

            <div className="form-field">
                <label htmlFor="firstName">First name</label>
                <input
                    type='firstName'
                    id='firstName'
                    name='firstName'
                    value={member.firstName}
                    onChange={e => {handleChange({firstName: e.target.value})}}
                    placeholder='firstName'
                />
            </div>

            <div className="form-field">
                <label htmlFor="surname">Surname</label>
                <input
                    type='surname'
                    id='surname'
                    name='surname'
                    value={member.surname}
                    onChange={e => {handleChange({surname: e.target.value})}}
                    placeholder='surname'
                />
            </div>

            <button type='submit'>Save</button>
        </form>
    )
}

export default MemberForm;