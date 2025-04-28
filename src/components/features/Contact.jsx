import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthFetch } from '../../utils/authFetch';

const Contact = () => {
  const authFetch = useAuthFetch();

  const [contact, setContact] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const contactId = searchParams.get('contactId') || 'None Selected';

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await authFetch(`/api/contacts/${contactId}`);
        const data = await response.json();
        setContact(data);
      } catch (err) {
        console.error('Failed to load contact:', err);
      }
    };
    fetchContact();
  }, [contactId]);

  return (
    <div className="flex flex-col gap-4 w-full py-5 px-10">
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
          <div>
            {contact.username ? (
              <div className="text-lg font-bold">{contact.username}</div>
            ) : (
              <div className="text-lg font-bold">Link Contact</div>
            )}
          </div>
        </div>
      </div>
      <div className="text-lg">
        This is the contact page for {contact.first_name} {contact.last_name}.
      </div>
    </div>
  );
};
export default Contact;
