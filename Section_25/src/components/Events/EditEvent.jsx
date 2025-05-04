import { Link, useNavigate, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js'
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const params = useParams();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { eventId: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000
  })

  /* const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ['events', { eventId: params.id }] });

      const previousEvent = queryClient.getQueryData(['events', { eventId: params.id }]);

      queryClient.setQueryData(['events', { eventId: params.id }], newEvent);

      return { previousEvent }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', { eventId: params.id }], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', { eventId: params.id }]);
    }
  }) */

  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    )
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Error fetching data" message={error.info?.message || 'Try again later.'} />
        <div className='form-actions'>
          <Link to=".." className='button'>
            Ok
          </Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? <p>Submitting...</p> : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', { eventId: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const eventData = Object.fromEntries(formData);

  await updateEvent({ id: params.id, event: eventData });

  queryClient.invalidateQueries(['events']);

  return redirect('..');
}