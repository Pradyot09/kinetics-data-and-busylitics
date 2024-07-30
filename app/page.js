import styles from "../css/globals.css";
import React from "react";

export default async function Home() {
  return (
    <>
      <main>
        <video
          src="video/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className={styles.video}
        />
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-2">
          <div className="content">
            <h1 className="text-white font-bold">
              Welcome to Construction Safety App.
            </h1>
            <p>Dashboard</p>
            <div className="grid grid-flow-col grid-rows-1 grid-cols-2 gap-8">
              <div>
                <div className="bg-black shadow rounded bg-opacity-40 text-zinc-50 italic">
                  <h1>
                    We Excel in providing solutions for Optimization and
                    Productivity Problems
                  </h1>
                  <p>Productivity, Optimization is our core focus areas</p>
                </div>
              </div>
              <div className="col-start-2">
                <div className="bg-white shadow rounded w-96">
                  {/* Add content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}