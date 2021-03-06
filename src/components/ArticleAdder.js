import React, { Component } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';

class ArticleAdder extends Component {
  state = {
    title: '',
    body: ''
  };

  handleOnChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleOnSubmit = () => {
    const { title, body } = this.state;
    if (!title || !body) {
      return;
    }
    const { slug, user, postedArticle } = this.props;
    postedArticle(title, body, slug, user);
    this.setState({ title: '', body: '' });
  };

  render() {
    const { title, body } = this.state;

    return (
      <div className="create-article">
        <Form onSubmit={this.handleOnSubmit}>
          <h3>Create article</h3>
          <Form.Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleOnChange}
          />
          <Form.Input
            placeholder="Start typing your article"
            name="body"
            value={body}
            onChange={this.handleOnChange}
            control={TextArea}
          />
          <Button
            primary
            type="Submit"
            disabled={!title || !title.trim() || !body || !body.trim()}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ArticleAdder;
