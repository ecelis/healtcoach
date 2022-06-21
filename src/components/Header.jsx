export default function Header(props) {
    const { user } = props;
    return (
      <div className="header">
        <h1>Web Health Coach</h1>
        <div>{ user ? user.displayName : null }</div>
      </div>
    );
  }
