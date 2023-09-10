import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getMemberById, updateMember } from '../../api/member';
import MemberForm from '../../components/memberForm/MemberForm';

const EditMember = ({ updateLocalMembers }) => {

    const navigate = useNavigate();

    const params = useParams();
    const memberId = params.memberId;

    const { loading, error, value: member } = useAsync(() => getMemberById({ memberId }), [memberId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">Member can not be found</h1>

    const handleSubmit = ({ member }) => {
        return updateMember({ memberId, member: {
            firstName: member.firstName,
            surname: member.surname
        } }).then(updatedMember => {
            updateLocalMembers(updatedMember);
            navigate("/members");
        });  
    }

    return (
        <>
            <h2>Update Member</h2>

            <MemberForm handleSubmit={handleSubmit} initialData={member} />
        </>
    )
}

export default EditMember;