import React from 'react';

const Form = (props) => {
  const {} = props;
  return <form onChange={validate}>
    <label className="visually-hidden">E-mail</label>
    <textarea
      className="login__input form__input"
      type="textarea"
      name="textarea"
      placeholder="jhbjhbjh"
      required/>
    <button type="submit">Отправить</button>
	</form>;
};

const validate = () => {
	console.log(Form)

};

export default Form;
