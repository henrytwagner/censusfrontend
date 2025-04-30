import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthFetch } from '../../utils/authFetch';
import PrivateContact from './PrivateContact';
import PublicContact from './PublicContact';

const Contact = () => {
  const authFetch = useAuthFetch();
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get('contactId');
  const userId = searchParams.get('userId');

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const endpoint = contactId
          ? `/api/contacts/unified/${contactId}/`
          : `/api/contacts/unified/user/${userId}/`;
        const res = await authFetch(endpoint);
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error('Failed to load contact:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactId, userId]);

  if (loading) return <div>Loading...</div>;
  if (!contact) return <div>Contact not found.</div>;

  return (
    <div className="flex flex-col gap-4 w-full my-5 mx-10">
      <div className="flex flex-row items-center gap-4">
        <div className="rounded-full h-18 w-18 shrink-0 overflow-hidden m-2">
          {contact.profile_image_url ? (
            <img
              className="h-full w-full object-cover object-center"
              src={contact.profile_image_url}
              alt=""
            />
          ) : (
            <div className="w-full h-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center">
              {contact.first_name && contact.last_name
                ? contact.first_name[0] + contact.last_name[0]
                : ''}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-5xl font-thin">
            {contact.first_name} {contact.last_name}
          </div>
          <div className="text-lg font-bold">{contact.username || ''}</div>
        </div>
      </div>
      <div className="w-full h-10 flex items-center">
        <button
          onClick={() => setSearchParams({ contactId, contactType: 'contact' })}
          className="w-fit h-full text-nowrap flex items-center px-3 rounded-t-2xl border-1 border-gray-300"
        >
          Contact
        </button>
        <button
          onClick={() => setSearchParams({ userId, contactType: 'public' })}
          className="w-fit h-full text-nowrap flex items-center px-3 rounded-t-2xl border-1 border-gray-300"
        >
          Public Profile
        </button>
      </div>
      {contact.contact_id ? (
        <PrivateContact contactId={contact.contact_id} />
      ) : null}
      {contact.user_id ? <PublicContact userId={contact.user_id} /> : null}
    </div>
  );
};

export default Contact;
