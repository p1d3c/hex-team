import './Main.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import TableComponent from '../TableComponent/TableComponent';

function Main(props) {
  const validationSchema = yup.object().shape({
    link: yup.string().url('Некорректный URL').required('Обязательное поле'),
  });

  function handleClick() {
    navigator.clipboard.writeText(`http://79.143.31.216/${props.shortLinkData.short}`);
  }

  return (
    <main className='main'>
      <h1 className='main__title'>Сократить ссылку</h1>
      <Formik
        initialValues={{
          link: '',
        }}
        validateOnBlur
        validateOnChange
        onSubmit={(values) => {
          props.handleSqueeze(values.link);
        }}
        validationSchema={validationSchema}
      >
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid}) => {
          return (
            <form className='main__form'>
              <input
                className='main__input'
                type='text'
                name={'link'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
              />
              {touched.link && errors.link && <span className='main__error'>{errors.link}</span>}
              <button type='submit' className='main__button' disabled={!isValid} onClick={handleSubmit}>
                Сократить
              </button>
            </form>
          );
        }}
      </Formik>

      <div className='main__container'>
        <h2 className='main__subtitle'>Результат:</h2>
        <p className='main__result' onClick={handleClick} title='Нажмите чтобы скопировать'>
          {!!props.shortLinkData.short && `http://79.143.31.216/${props.shortLinkData.short}`}
        </p>
      </div>
      <TableComponent statistics={props.statistics} handleAddStatistics={props.handleAddStatistics} />
    </main>
  );
}

export default Main;
