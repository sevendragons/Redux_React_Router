import React, {Component} from 'react'
import {BrowserRouter, Switch, Link, Route, Other} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {createPost} from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    // const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : '  '}`
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`
    return(
      // onChange={field.input.onChange}
      // onBlur={field.input.Blur}
      <div className={className}>
        <label htmlFor="Title">{field.label}</label>
        <input className="form-control"
               onFocus={field.input.onFocus}
               {...field.input}
               type="text" />
        <div className="text-help">
          { touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    // console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/')
    });
  }

  render () {
    const { handleSubmit } = this.props;

    return(
      <div>
        <Link className="btn btn-primary" to="/">Home</Link>
        <h3>This is Post New</h3>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>

          <Field label="Title for Post" name="title" component={this.renderField}></Field>
          <Field label="Categories" name="categories" component={this.renderField}></Field>
          <Field label="Post Content" name="content" component={this.renderField}></Field>
          <button className="btn btn-primary" type="submit">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

/*--------------------------------------------------------------*/
/* Validate the data input if it's wrong
/*--------------------------------------------------------------*/
function validate(values){
  // console.log(values);
  const errors = {};
  if ( !values.title || values.title.length < 3 ) {
    errors.title = "Enter a title, which has more 3 characters!";
  }
  if(!values.categories){
    errors.categories = "Enter a categories"
  }
  if (!values.content) {
    errors.content = "Enter a content"
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})( connect ( null, { createPost } ) ( PostsNew ) );
