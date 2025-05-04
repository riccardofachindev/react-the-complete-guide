import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const params = useParams()
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { eventId: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })

  const { mutate, isPending: mutateIsPending, isError: mutateIsError, error: mutateError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['events'],
          refetchType: 'none'
        }),
        navigate('/events');
    }
  })

  function openIsDelete() {
    setIsDelete(true);
  }

  const closeIsDelete = () => {
    setIsDelete(false);
  }

  function handleDeleteClick() {
    mutate({ id: params.id });
  }

  let formattedDate;
  if (data) {
    formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <>
      {isDelete &&
        <Modal onClose={closeIsDelete}>
          <h2>Are you sure?</h2>
          <p>This will deleting permanently.</p>
          {mutateIsPending && <p>Deleting...</p>}

          {!mutateIsPending &&
            <div className='form-actions'>
              <button onClick={closeIsDelete} className='button-text'>Cancel</button>
              <button onClick={handleDeleteClick} className='button'>Confirm</button>
            </div>
          }

          {mutateIsError && (
            <ErrorBlock title="Delete error" message={mutateError.info?.message || 'Try again later.'} />
          )}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {isPending && (
          <div id="event-details-content" className='center'>
            <p>Fetching event data...</p>
          </div>
        )}

        {isError && (
          <div id="event-details-content" className='center'>
            <ErrorBlock title="Error fetching event data" message={error.info?.message || 'Try fetching data later.'} />
          </div>
        )}

        {data &&
          <>
            <header>
              <h1>{data.title}</h1>
              <nav>
                <button onClick={openIsDelete}>Delete</button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>
            <div id="event-details-content">
              <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{data.location}</p>
                  <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} - {data.time}</time>
                </div>
                <p id="event-details-description">{data.description}</p>
              </div>
            </div>
          </>
        }
      </article>
    </>
  );
}
