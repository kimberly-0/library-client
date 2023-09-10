import { makeRequest } from './axiosConfig';

export function getMembers() {
  return makeRequest("/users");
}

export function getMemberById({ memberId }) {
  return makeRequest(`/users/${memberId}`);
}

export function updateMember({ memberId, member }) {
  return makeRequest(`/users/${memberId}`, {
    method: "PUT",
    data: member,
  });
}

export function createMember({ member }) {
  return makeRequest(`/users`, {
    method: "POST",
    data: member,
  });
}

export function deleteMember({ memberId }) {
  return makeRequest(`/users/${memberId}`, {
    method: "DELETE",  
  });
}