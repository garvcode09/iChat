import "./Loading.css";

function Loading({ message = "Loading" }) {
  return (
    <div className="loading">
      <div className="loading-spinner" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loading-brand">iChat</p>
      <p className="loading-message">
        {message}
        <span className="loading-dots" aria-hidden="true"></span>
      </p>
    </div>
  );
}

export default Loading;
