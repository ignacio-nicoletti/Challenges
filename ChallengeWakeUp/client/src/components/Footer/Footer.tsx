import React from "react";

import linkedinIcon from "../../Assets/iconsPage/linkedin.png";
import githubIcon from "../../Assets/iconsPage/github.png";
import instagramIcon from "../../Assets/iconsPage/instagram.png";
import style from "./Footer.module.css";
import gmail from "../../Assets/iconsPage/gmail.svg";

export function Footer() {
  return (
    <div>
      <div className={style.contain}>
        <div
          className={style.logo}
          data-aos="fade-right"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1500"
        >
          <a href="/">
            <span>Ignacio </span>
            <span>Nicoletti</span>
          </a>
        </div>

        <div className={style.centerFooter}>
          <p>Challenge WakeUP</p>
        </div>

        <div className={style.social_media}>
          <a
            href="mailto:nicolettiignacio5@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gmail} alt="Gmail" />
          </a>
          <a
            href="https://www.linkedin.com/in/ignacio-nicoletti/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedinIcon} alt="Linkedin" />
          </a>

          <a
            href="https://github.com/ignacio-nicoletti"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a
            href="https://wake-up-challenge.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20.94 13.045a9 9 0 1 0 -8.953 7.955" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h9.4" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a16.991 16.991 0 0 1 2.529 10.294" />
              <path d="M16 22l5 -5" />
              <path d="M21 21.5v-4.5h-4.5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
