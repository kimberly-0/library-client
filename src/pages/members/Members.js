import React from 'react';
import { Link } from 'react-router-dom';
import { deleteMember } from '../../api/member';

const Members = ({ members, deleteLocalMember }) => {

    const handleDelete = member => {
        if (member.borrower != null) {
            console.log("Cannot delete since member currently has books on loan");
        } else {
            if (window.confirm(`Are you sure you want to delete the member ${member.firstName} ${member.surname}?`)) {
                deleteMember({ memberId: member.id }).then(() => {
                    deleteLocalMember(member.id);
                }).catch(err => {
                    console.log(err);
                }); 
            } else {
                console.log("Member not deleted");
            }            
        }  
    };

    return (
        <>
            <Link to={'/members/add'} className="add-new-button">Add new member</Link>

            {members?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number of books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => 
                            <tr key={member.id}>
                                <td>{member.firstName ? `${member.firstName}` : ""} {member.surname ? `${member.surname}` : ""}</td>
                                <td>{member.numOfBooks ? member.numOfBooks : "0"}</td>
                                <td><Link to={`/members/${member.id}/edit`} className="action-button">Edit</Link></td>
                                <td><button onClick={() => handleDelete(member)} className="action-button delete-button">Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>No members found</p>
            )}
        </>
    )
}

export default Members;