export default function LogoutForm() {
  return (
    <form method="post" action="/logout">
      <div className="flex">
        <button className="btn ml-auto" type="submit">
          Logout
        </button>
      </div>
    </form>
  );
}
