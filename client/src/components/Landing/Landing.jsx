import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="newGrid">
      <main className=" text-center mt-[4vh]">
        <h1 class="text-danger">kjw Task List</h1>
        <div class="card p-3 shadow-sm">
          <p class="text-muted">A version of ToDo Task List</p>
          <p>Customized for personal use</p>
        </div>

        <img
          className="imageLogo"
          src="https://i.imghippo.com/files/anP8808iHg.webp"
          alt="LogoImagefprGameStrategy"
          border="0"
        />
      </main>
      </div>
    </>
  );
};

export default Landing;
