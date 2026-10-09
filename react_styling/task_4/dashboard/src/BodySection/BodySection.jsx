import { Component } from 'react';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection mt-10">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
