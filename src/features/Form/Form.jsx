import { useFormik } from 'formik';
import { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useCustomContext } from '../../context';

export const Form = () => {
  const { filteredItems, setFormValues } = useCustomContext();

  const initialValues = {
    height: 0,
    width: 0,
    length: 0,
  };

  const onSubmit = (values) => {
    filteredItems(values);
  };

  const onReset = (values, { resetForm }) => {
    setFormValues({});
  };

  const { handleChange, values, resetForm, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    onReset,
  });

  const [eventKey, setEventKey] = useState(1);
  const confirm = (e) => {
    e.stopPropagation();
    setEventKey(0);
  };
  const openAccordion = (e) => {
    setEventKey(1);
  };

  return (
    <div style={{ position: 'absolute', zIndex: 999 }}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey={eventKey} onClick={openAccordion}>
          <Accordion.Header width="280px">Настройка</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <label htmlFor="basic-url" className="form-label">
                  Длина (см)
                </label>
                <div className=" mb-3">
                  <input
                    type="number"
                    value={values.length}
                    onChange={handleChange}
                    className="form-control"
                    id="length"
                    name="length"
                    aria-describedby="basic-addon3"
                  />
                </div>
                <label htmlFor="basic-url" className="form-label">
                  Ширина (см)
                </label>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    value={values.width}
                    onChange={handleChange}
                    className="form-control"
                    id="width"
                    name="width"
                    aria-describedby="basic-addon3"
                  />
                </div>
                <label htmlFor="basic-url" className="form-label">
                  Высота (см)
                </label>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    value={values.height}
                    onChange={handleChange}
                    className="form-control"
                    id="height"
                    name="height"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <Button type="submit" variant="success" onClick={confirm} data-bs-dismiss="modal">
                  Применить
                </Button>
                <Button variant="outline-secondary" onClick={resetForm}>
                  Сбросить
                </Button>
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
