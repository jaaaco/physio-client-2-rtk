import PouchDb from 'pouchdb'

import {
  add,
  remove,
  update,
  list
} from '../features/database/slice'

/*
const sampleData = {
  patients: [
    {
      id: 'patient-000001',
      name: 'First',
      surname: 'Patient',
      birthDate: '1988-12-12',
      comment: 'No comment for now',
    },
  ],
  appointments: [
    {
      id: 'appointment-000001',
      visitDate: '2019-06-15',
      interview: 'Some interview data',
      patientId: 'patient-000001',
    },
  ],
  scans: [
    {
      id: 'scan-000001',
      order: 1,
      mesh: 'lotsadata',
      appointmentId: 'appointment-000001',
    },
  ],
};
*/

const db = {
  patients: new PouchDb('patients'),
  appointments: new PouchDb('appointments'),
  scans: new PouchDb('scans')
}

window.db = db

const database = ({ dispatch }) => next => async (
  action
) => {
  // if (action.type === getType(listRequest)) {
  //   const { model }: { model: IModel } = action.payload;
  //   try {
  //     const docs = await db[model].allDocs({
  //       // eslint-disable-next-line @typescript-eslint/camelcase
  //       include_docs: true,
  //       attachments: false
  //     });
  //
  //     const rows = (docs.rows as any).map(({ doc }: { doc: any }) => doc);
  //
  //     dispatch(
  //       listSuccess(
  //         model,
  //         rows,
  //       ),
  //     );
  //   } catch (err) {
  //     dispatch(listFailure(model, err));
  //   }
  // }

  console.info({ actionTYpe: action.type })

  const model = 'patients'
  if (action.type === 'patients/add') {
    try {
      const { mesh, ...resourceWithoutBlobs } = action.payload
      // tslint:disable-next-line:prefer-const
      let { id, rev } = await db[model].post(resourceWithoutBlobs)
      if (mesh) {
        const result = await db[model].putAttachment(
          id,
          'scan.ply',
          rev,
          new Blob([mesh], { type: 'application/octet-stream' }),
          'application/octet-stream'
        )
        rev = result.rev
      }
      // dispatch(createSuccess(model, { ...resourceWithoutBlobs, _id: id, _rev: rev }));
    } catch (err) {
      // dispatch(createFailure(model, err));
    }
  }
  next(action)

  //
  // if (action.type === getType(updateRequest)) {
  //   const {
  //     model,
  //     resource,
  //   }: { model: IModel; resource: IResource } = action.payload;
  //
  //   try {
  //     const { rev } = await db[model].put(resource);
  //     dispatch(updateSuccess(model, { ...resource, _rev: rev }));
  //   } catch (err) {
  //     dispatch(updateFailure(model, err));
  //   }
  // }
  // if (action.type === getType(removeRequest)) {
  //   const {
  //     model,
  //     resource,
  //   }: { model: IModel; resource: IResource } = action.payload;
  //   try {
  //     const { id: removedId } = await db[model].remove(resource);
  //     dispatch(removeSuccess(model, removedId));
  //   } catch (err) {
  //     dispatch(removeFailure(model, err));
  //   }
  // }
}
export default database
