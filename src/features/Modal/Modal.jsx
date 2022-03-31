import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { useCustomContext } from '../../context';

export const ModalEdit = () => {
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

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Фильтрация
            </h5>
            <Button type="button" className="btn-close" data-bs-dismiss="modal"></Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label htmlFor="basic-url" className="form-label">
                Длина (см)
              </label>
              <div className="input-group mb-3">
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
              <Button type="submit" variant="success" data-bs-dismiss="modal">
                Применить
              </Button>
              <Button variant="outline-secondary" onClick={resetForm}>
                Сбросить
              </Button>
              <Button variant="secondary" data-bs-dismiss="modal">
                Закрыть
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
