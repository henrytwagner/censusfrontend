import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthFetch } from '../../utils/authFetch';
import PrivateContact from './PrivateContact';
import PublicContact from './PublicContact';

const Contact = () => {
  const authFetch = useAuthFetch();

  const [searchParams, setSearchParams] = useSearchParams();
  const contactId = searchParams.get('contactId');
  const userId = searchParams.get('userId');

  const [privateContact, setPrivateContact] = useState(null);
  const [publicProfile, setPublicProfile] = useState(null);
  const [view, setView] = useState('public');

  useEffect(() => {
    if (!contactId) return;
    (async () => {
      try {
        const res = await authFetch(`/api/contacts/${contactId}/`);
        const data = await res.json();
        setPrivateContact(data);
        setPublicProfile(data.public_profile || null);
        setView('contact');
      } catch (err) {
        console.error('Failed to load contact:', err);
      }
    })();
  }, [contactId]);

  useEffect(() => {
    if (contactId || !userId) return;
    (async () => {
      try {
        const res = await authFetch(`/api/users/public/${userId}/`);
        const data = await res.json();
        setPublicProfile(data);

        if (data.my_contact) {
          // user already has a private contact
          setPrivateContact(data.my_contact);
          setView('contact');
        } else {
          // no private contact yet
          setPrivateContact(null);
          setView('public');
        }
      } catch (err) {
        console.error('Failed to load public profile:', err);
      }
    })();
  }, [contactId, userId]);

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
          <div>
            {contact.username ? (
              <div className="text-lg font-bold">{contact.username}</div>
            ) : (
              <div className="text-lg font-bold">Link Contact</div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-10 flex items-center">
        <button
          onClick={() => setSearchParams({ contactId, contactType: 'contact' })}
          className={`w-fit h-full text-nowrap flex items-center px-3 rounded-t-2xl border-1 ${contactType === 'contact' ? '  border-b-white' : 'border-white border-b-gray-300'}  border-gray-300`}
        >
          Contact
        </button>
        {contact.linked_profile && (
          <button
            onClick={() =>
              setSearchParams({ contactId, contactType: 'public' })
            }
            className={`w-fit h-full text-nowrap flex items-center px-3 rounded-t-2xl border-1 ${contactType === 'public' ? '  border-b-white' : 'border-white border-b-gray-300'}  border-gray-300`}
          >
            Public Profile
          </button>
        )}

        <div className="w-full h-full flex items-center border-b-1 border-gray-300">
          {!contact.linked_profile && (
            <div className=" w-fit h-fit mx-1 px-2 py-1 rounded-full border-1 border-gray-300 text-sm">
              🔗 Link Public Profile
            </div>
          )}
        </div>
      </div>

      {contactType === 'contact' ? <PrivateContact /> : <PublicContact />}
    </div>
  );
};
export default Contact;
