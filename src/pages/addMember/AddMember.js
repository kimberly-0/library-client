import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember } from '../../api/member';
import MemberForm from '../../components/memberForm/MemberForm';

const AddMember = ({ addLocalMember }) => {

    const navigate = useNavigate();

    const handleSubmit = ({ member }) => {
        return createMember({ member }).then(newMember => {
            addLocalMember(newMember);
            navigate("/members");
        });  
    }

    return (
        <>
            <h2>Add a new member</h2>

            <MemberForm handleSubmit={handleSubmit} />
        </>
    )
}

export default AddMember;