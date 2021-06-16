import "./styles.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const url = "https://course-api.com/react-tabs-project";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const resp = await fetch(url);
    const newJobs = await resp.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }
  const { dates, title, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title"></div>
      <h2>Experience</h2>
      <div className="underline"></div>
      <div className="btn-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={job.id}
                onClick={() => {
                  setValue(index);
                }}
                className={`job-btn ${index === value ? "active-btn" : ""}`}
              >
                {job.company}
              </button>
            );
          })}
        </div>
      </div>
      <article className="job-info">
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className="job-date">{dates}</p>
        {duties.map((duty, index) => {
          return (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="FaAngleDoubleRight" />
              <p>{duty}</p>
            </div>
          );
        })}
      </article>
      <div className="jobs-center"></div>
    </section>
  );
}
