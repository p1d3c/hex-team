import './Main.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import ListRow from '../ListRow/ListRow';

function Main(props) {
  const {statistics} = props;

  const validationSchema = yup.object().shape({
    link: yup.string().url('Некорректный URL').required('Обязательное поле'),
  });

  return (
    <section className='main'>
      <Formik
        initialValues={{
          link: '',
        }}
        validateOnBlur
        validateOnChange
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid}) => {
          return (
            <div className='main__form'>
              <input
                className='main__input'
                type='text'
                name={'link'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
              />
              {touched.link && errors.link && <span className='main__error'>{errors.link}</span>}
              <button className='main__button' disabled={!isValid} onClick={handleSubmit} type='submit'>
                Сократить
              </button>
            </div>
          );
        }}
      </Formik>

      <ol className='main__list'>
        {statistics.map((item, index) => {
          return (
            <li className='main__list-item' key={index}>
              <ListRow item={item} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Main;
